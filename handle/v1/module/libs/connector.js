const mongodb = require("mongodb");
const { resConfig } = require("../../../../config");

const { mongodUrl, dbName } = resConfig;
let mongoClient;
let db;

function dbClose() {
  if (mongoClient && mongoClient.isConnected()) {
    mongoClient.close();
  }
}

const dbConnect = function () {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
    } else {
      mongodb.MongoClient.connect(mongodUrl, { useUnifiedTopology: true }, function (err, client) {
        if (err) {
          reject(err);
        }
        mongoClient = client;
        db = mongoClient.db(dbName);
        // Make sure connection closes when Node exits
        process.on("exit", () => {
          dbClose();
        });
        resolve(db);
      });
    }
  });
};

module.exports = {
  dbConnect,
};
