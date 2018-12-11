var router = require('express').Router();
router.use('/shipments', require('./shipments/plural'))
router.use('/shipment', require('./shipments/singular'))
module.exports = router;