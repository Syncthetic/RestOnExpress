# RestOnExpress
> Easily build and manage a RESTful API using Express and MongoDB.

To get started, clone the repository
`git clone https://github.com/Syncthetic/RestOnExpress`

Install dependant packages `npm install`

Traverse to the installation `cd RestOnExpress` and copy the example datbase file to db.js file `cp db.example.js db.js`

Configure the database connection settings
> Feel free to pull the connection settings from `ENV` or a file outside the repository

```
const CONNECTION_URL = '<Your MongoDB connection string (SRV if applicable)'
const DATABASE_NAME = "<Your database name>"
```

Inside the `connect` method, set your desired table/collection name you'll be working with

```
// You would change the collection name, to your desired collection (table)
collection = database.collection("shipments")
```

You can instantiate multiple collections as desired for your API.

If desired, you can change the base reference to your API in `app.js`, default is `/api`
`app.use('/api', require('./routes'));`

Set your resources in `/routes/index.js` a default resource `shipments` is available to explore. Since resources have verbiage attached, why have both a singular and plural route set.
> this could probably be done programatically via some lazy-loading
```
// inside /routes/index.js
router.use('/shipments', require('./shipments/plural'))
router.use('/shipment', require('./shipments/singular'))
```

Resources are added here inside `/routes`, you can nest multiple routes inside each other as desired.

Start the API service `node app.js`

Sending requests: `http://localhost:3000/api/route`
> i.e, `GET http://localhost:3000/api/shipments` or `PUT http://localhost:3000/api/shipment`