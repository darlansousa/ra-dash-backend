const classifications = require('./classifications');
const complaints = require('./complaints');
const exports_routes = require('./exports');
const dashboards = require('./dashboards');
const swaggerUi = require('swagger-ui-express');
const routes = require('express').Router();

swaggerDocument = require('../swagger.json');


routes.use('/complaints', complaints);
routes.use('/classifications', classifications);
routes.use('/exports', exports_routes);
routes.use('/dash', dashboards);

routes.use('/',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);


module.exports = routes;