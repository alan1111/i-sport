import axios from 'axios';

const updateMenu = async (list) => {
  const {data: currentData} = await getUsers();
  currentData.menuList = list;
  const option = {
    content: currentData,
    "_model": "json",
    "updateTime": new Date().toISOString(),
    "createTime": "2021-11-04T08:24:50.407Z",
    "_id": "632d7287f874140011705ea4",
    "name": "美餐预约",
    "createUserId": "iyb-lixuan",
    "createUserName": "李旋",
    "updateUserName": "李旋",
    "updateUserId": "iyb-lixuan"
  }
  
  const {data: resData} = await axios({
    method: 'POST',
    url: 'http://doc.baoyun.ltd/api/common/save',
    headers: {
      'code': '09c66bbc-672c-4975-b064-be66dff83f55',
    },
    data: option
  }).catch(e => e.response);
  return  resData;
}

const getUsers = async () => {
  const {data} = await axios.get('http://doc.baoyun.ltd/api/json/detail?id=DCTNarYM');
  return data;
}

export {
  updateMenu,
  getUsers
}