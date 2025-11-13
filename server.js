const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./api/routes/routes')
const port = process.env.PORT || 3000;
const MongoClient = require('mongodb').MongoClient;
const mongodb = require("./api/db/connect");
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const { errorHandler } = require("./api/middleware/errorHandler");

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', "*");
    next();
})

app.use('/', routes);

app.use(errorHandler);

mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});