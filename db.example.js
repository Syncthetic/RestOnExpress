const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectID;


const CONNECTION_URL = '<Your MongoDB connection string (SRV if applicable)'
const DATABASE_NAME = "<Your database name>"

// if you have multiple tables, instantiate multiple collections as the table name, i.e,
// shipments = database.collection('shipments')
// employees = database.collection('employees')

module.exports = {
    connect: () => {
        MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
            if(error) { throw error; }
            database = client.db(DATABASE_NAME);
            // You would change the collection name, to your desired collection (table)
            collection = database.collection("shipments");
            console.log("Connected to database: `" + DATABASE_NAME);
        })
    }
}
