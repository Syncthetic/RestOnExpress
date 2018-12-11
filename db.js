const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;

const CONNECTION_URL = process.env.ROE_DB_CONNECTION
const DATABASE_NAME = process.env.ROE_DB_NAME
const COLLECTIONS = process.env.ROE_COLLECTIONS
console.log('COLLECTIONS', COLLECTIONS)

const COLLECTION_LIST = []

module.exports = {
    connect: () => {
        init_colls = (db) => {
            COLLECTIONS.split(':').map(coll => {
                const c = { name: coll, ref: db.collection(coll) }
                COLLECTION_LIST.push(c)
            })
        }
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if(error) { throw error; }
            database = client.db(DATABASE_NAME);
            init_colls(database)
            collection = database.collection(COLLECTION_LIST[0].name)
            console.log("Connected to database: " + DATABASE_NAME);
        })
    },

    coll: (name) => {
        return COLLECTION_LIST.find(coll => { return coll.name === name } ).ref
    }
}
