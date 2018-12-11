const Express = require("express");
const BodyParser = require("body-parser");
const database = require('./db')
const PORT = process.env.ROE_PORT || 3000
const API_BASE = process.env.ROE_API_BASE || '/api'

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use(API_BASE, require('./routes'));


app.listen(PORT, () => {
    console.log(`Application started on http://localhost:${PORT}${API_BASE}`)
    database.connect()
});