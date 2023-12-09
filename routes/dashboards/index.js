const routes = require('express').Router();

const get = require('../../controllers/dashboards/get')


routes.get('/', get);

module.exports = routes;