# RestOnExpress
> Easily build and manage a RESTful API using Express and MongoDB.

To get started, clone the repository
`git clone https://github.com/Syncthetic/RestOnExpress`

Install dependant packages `npm install`

Configuration settings are pulled from the environment.

| Environment Variable | Value                                         | Default Value |
|-                     | -                                             | -             |
| `ROE_DB_CONNECTION`  | `<mongodb+srv://<username>:<password>@<host>` |               |
| `ROE_DB_NAME`        | `<name of the datbase>`                       |               |
| `ROE_COLLECTIONS`    | `<collection1:collection2:...>`               |               |
| `ROE_PORT`           | `<application listening port>`                | `3000`        |
| `ROE_API_BASE`       | `<the base reference to the API>`             | `/api`        |
> Note that the first collection in the `ROE_COLLECTIONS` environment variable will be instantiated first. To use other collections in your resources, call the `coll(name: string): collection` method

The API resources should be configured inside the `routes/index.js` file.
Configure resources to point to the file which handles it's logic.
These files should be stored and nested inside the `/routes` directory. I would encourage the use of descriptive path names.
```javascript
// routes/index.js
router.use('/users', require('./users') // load routes/users/index.js
router.use('/user', require('./user')   // load routes/user/index.js
```
> Since resources are in noun form, and can have singular and plural form associated with it, such as `user` and `users` resources, you may choose to have both singular and plural forms in one directory such as `routes/users/plural.js` and `routes/users/singular.js`

If your environment variables are set, start the API service with `node app.js`
If desired, enter the environment variables when invoking the application
```
ROE_DB_CONNECTION="mongodb+srv://myusername:secretpass@myhost.com" \
ROE_DB_NAME="orders" \
ROE_COLLECTIONS="products" \
node app.js
```

Sending API requests: `http://localhost:<ROE_PORT>/<ROE_API_BASE>/<desired route path>`
> i.e,
>`GET http://localhost:3000/api/users` or 
>`PUT http://localhost:3000/api/user`

Example for a simple `user` resource

```javascript
// routes/user/index.js

var router = require('express').Router();

router.post("/", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.status(201).send(result.result);
    })
})

// GET /api/user/:id
router.get("/:id", (request, response) => {
    collection.findOne({ "userId": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    })
})

// PUT /api/user/:id
router.put("/:id", (request, response) => {
    collection.updateOne(
        { "userId" : request.params.id },
        { $set: request.body },
        { upsert: true},
        (error, result) => {
            if (error) { return response.status(500).send(error) }
            if (result.result.nModified === 1 && result.result.n === 1) response.status(200).send(result.result)
            else if ( result.result.upserted ) response.status(201).send(result.result)
            else if (result.result.n === 1 && result.result.nModified === 0 ) response.status(304).send(result.result)
        }
     )
})

// DELETE /api/user/:id
router.delete("/:id", (request, response) => {
    collection.deleteOne({ "userId": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    })
})

module.exports = router; 
```