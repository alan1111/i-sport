import axios from 'axios';
import qs from 'qs';
import {getUsers, updateMenu} from './lowCode'

const baseUrl = 'https://www.meican.com';

const getBaseInfo = async (key, remember) => {
  const res = await axios.get(`${baseUrl}?key=${key}`, {
    headers: {
      Cookie: `remember=${remember} `
    }
  });
  const tokenReg = /(?<=accessToken:")[^"]*/;
  const matchToken = res.data.match(tokenReg);

  const clientIdReg = /(?<=client_id=")[^"]*/;
  const clientSecretReg = /(?<=client_secret=")[^"]*/;
  const clientReqReg = /(?<=https:\/\/www.meicanstatic.com\/sta\/fe\/kiwi\/demeter-fe\/)([^.]*)\.js/g;
  const clientReqMatch = res.data.match(clientReqReg);
  const filterReqList = [... new Set(clientReqMatch)];

  // 获取client_id & client_secret
  for (let i=0; i< filterReqList.length; i++) {
    const clientUrl = `https://www.meicanstatic.com/sta/fe/kiwi/demeter-fe/${filterReqList[i]}`;
    const {data: clientRes} = await axios.get(clientUrl);
    if (clientRes.match(clientIdReg)) {
      return {
        token: matchToken[0],
        client_id: clientRes.match(clientIdReg)[0],
        client_secret: clientRes.match(clientSecretReg)[0]
      }
    }
  }
  return {}
}

const getOrderList = async (token, option) => {
  const {data} = await axios({
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + token,
      },
      params: option,
      url:`${baseUrl}/forward/api/v2.1/restaurants/list`
  }).catch(e => e.response);
  const {restaurantList} = data || {};
  const tempList = [];
  for (let i = 0; i < restaurantList.length; i++) {
    const val = restaurantList[i];
    const {name, uniqueId, tel} = val;
    const {data: dishData} = await axios({
      method: 'GET',
      headers: {
        'authorization': 'Bearer ' + token,
      },
      params: Object.assign({}, option, {restaurantUniqueId: uniqueId}),
      url:`${baseUrl}/forward/api/v2.1/restaurants/show`
    }).catch(e => e.response);
    const {dishList} = dishData;
    tempList.push({
      name,
      tel,
      subList: dishList.map(i => {
        const { id, name } = i;
        return {
          id,
          name
        }
      })
    })
  }
  return tempList;
}

const orderReq = async(token, option) => {
  // console.log('2222', option)
  // console.log('3333', qs.stringify(option))
  const url = `${baseUrl}/forward/api/v2.1/orders/add`;
  const {data} = await axios({
      method: 'POST',
      headers: {
        'authorization': 'Bearer ' + token,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: qs.stringify(option),   // 用 qs 将js对象转换为字符串 'name=edward&age=25'
      url
  }).catch(e => e.response);
  return data;
}

const setMenuList = async () => {
  // 获取用户列表
  const targetTime = `${new Date().toISOString().slice(0, 10)} 16:30`;
  const {data: {users: userList}} = await getUsers();
  const {key, remember} = userList[0]
  const {token, client_id, client_secret} = await getBaseInfo(key, remember);
  const orderList = await getOrderList(token, {
    tabUniqueId: key,
    targetTime,
    client_id,
    client_secret
  });
  await updateMenu(orderList);
}

const meican = async (req, res, next) => {
  // 获取用户列表
  const {data: {users: userList}} = await getUsers();
  const tempRes = {
    successList: [],
    failList: []
  }
  const day = new Date().getDay(); // 3 为周三, 对应orderList的下标2
  const targetTime = `${new Date().toISOString().slice(0, 10)} 16:30`;

  // 设置MenuList
  await setMenuList();
console.log('userList : ', JSON.stringify(userList));
  // 下订单
  for(let i = 0; i < userList.length; i++) {
    const {key, remember,name, orderList} =userList[i]
    const {token, client_id, client_secret} = await getBaseInfo(key, remember);
    const order = [{"count":1,"dishId":orderList[day-1]}];
    const option = {
      tabUniqueId: key,
      targetTime,
      client_id,
      client_secret,
      order: JSON.stringify(order)
    }
    const res = await orderReq(token, option);
    if (res.error) {
      tempRes.failList.push({
        name,
        reason: res.error_description
      })
      console.log(`sorry, ${name}订餐失败，失败原因：${res.error_description}`)
    } else {
      tempRes.successList.push(name)
      console.log(`恭喜${name}订餐成功`)
    }
  }
  res.send(tempRes)
  return next();
};

export default meican;
