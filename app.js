'use strict';

const config = require('./config.js');
const morgan = require('morgan');
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const req = require('require-yml');
const api = require("./routes");
const oas = req("./votingOAS.yaml");
// Create the application.
const express = require("express");
const app = express();

app.use(morgan(config.get("logs.level")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(api);

app.use('/docs', swaggerUi.serve, swaggerUi.setup(oas));

app.get('/', (req, res) => {
    res.status(200).send({ message: 'The best REST API :=)' });
});


app.listen(config.get("port"), () => {
    console.log(`App running: http://localhost:${config.get("port")}`);
});
