const {fetchAll} = require('./libs/mongoMode');

const getUser = async (req, res, next) => {
  console.log('11111', req.query)
  const response = await fetchAll()
  res.send(response);
  return next();
};

module.exports = {
  getUser,
};
