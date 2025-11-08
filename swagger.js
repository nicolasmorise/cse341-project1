const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Contacts API',
    description: 'This API retrieve data from a database about contacts. It can add, delete, read and update data from the db'
  },
  host: 'localhost:3000'
};

const outputFile = './swagger-output.json';
const routes = ['./api/routes/routes.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);