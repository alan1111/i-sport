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
      console.log(err)
    });
})();

function create(desc) {
  return new Promise((resolve, reject) => {
    let lists = db.collection("userList");
    let listId = mongodb.ObjectId();
    let whenCreated = Date.now();
    let item = {
      _id: listId,
      desc,
      createTime: whenCreated,
      updateTime: null,
    };
    lists.insertOne(item, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve({ data: { createdId: result.insertedId }, statusCode: 201 });
      }
    });
  });
}

function fetchAll() {
  return new Promise((resolve, reject) => {
    let lists = db.collection("userList");
    lists.find({}).toArray((err, documents) => {
      if (err) {
        reject(err);
      } else {
        resolve({
          data: documents,
          statusCode: documents.length > 0 ? 200 : 404,
        });
      }
    });
  });
}

module.exports = {
  create,
  fetchAll,
}
