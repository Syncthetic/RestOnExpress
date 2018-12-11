const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = process.env.ROE_DB_CONNECTION
const DATABASE_NAME = process.env.ROE_DB_NAME
const COLLECTIONS = process.env.ROE_COLLECTIONS

module.exports = {
    connect: () => {
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if(error) { throw error; }
            database = client.db(DATABASE_NAME);
            collection = database.collection(COLLECTIONS)
            console.log("Connected to database: " + DATABASE_NAME);
        })
    }
}
