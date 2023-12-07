const routes = require('express').Router();

const get = require('../../controllers/classifications/get')

routes.get('/', get);

module.exports = routes;