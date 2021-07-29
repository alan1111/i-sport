const mongodb = require("mongodb");
const { dbConnect } = require("./connector");

let db;

// Get a DB connection when this module is loaded
(() => {
  dbConnect()
    .then((database) => {
      db = database;
    })
    .catch((err) => {
      console.log(err);
    });
})();

function create(content) {
  return new Promise((resolve, reject) => {
    let lists = db.collection("userList");
    let listId = mongodb.ObjectId();
    let whenCreated = Date.now();
    let item = {
      _id: listId,
      content,
      createTime: whenCreated,
      updateTime: null,
    };
    lists.insertOne(item, (err, result) => {
      if (err) {
        resolve({ reason: err, code: 1 });
      } else {
        resolve({ result, code: 0 });
      }
    });
  });
}

function fetchAll(content) {
  return new Promise((resolve, reject) => {
    let lists = db.collection("userList");
    lists.find(content).toArray((err, result) => {
      if (err) {
        resolve({ reason: err, code: 1 });
      } else {
        resolve({ result, code: 0 });
      }
    });
  });
}

module.exports = {
  create,
  fetchAll,
};
