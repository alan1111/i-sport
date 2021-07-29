const test = (req, res) => {
  res.send(req.params);
};

module.exports = {
  test,
};
