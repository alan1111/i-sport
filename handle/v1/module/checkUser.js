const {fetchAll} = require('./libs/mongoMode');

const checkUser = async (req, res, next) => {
  const response = await fetchAll(req.body)
  res.send(response);
  return next();
};

module.exports = {
  checkUser,
};
