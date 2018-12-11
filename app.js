const Express = require("express");
const BodyParser = require("body-parser");
const database = require('./db')

var app = Express();

app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
app.use('/api', require('./routes'));


app.listen(3000, () => {
    database.connect()
});