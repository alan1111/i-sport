const {create} = require('./libs/mongoMode');
const addUser = async (req, res, next) => {
  console.log('11111', req.body)
  const response = await create(req.body)
  res.send(response);
  return next();
};

module.exports = {
  addUser,
};
