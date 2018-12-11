var router = require('express').Router();

router.post("/", (request, response) => {
    collection.insertOne(request.body, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.status(201).send(result.result);
    })
})

// GET /api/shipment/:id
router.get("/:id", (request, response) => {
    collection.findOne({ "shipmentID": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    })
})

// PUT /api/shipment/:id
router.put("/:id", (request, response) => {
    collection.updateOne(
        { "shipmentID" : request.params.id },
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

// DELETE /api/shipment/id
router.delete("/:id", (request, response) => {
    collection.deleteOne({ "shipmentID": request.params.id }, (error, result) => {
        if(error) {
            return response.status(500).send(error);
        }
        response.send(result.result);
    })
})

module.exports = router; 