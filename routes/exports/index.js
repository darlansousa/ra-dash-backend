const routes = require('express').Router();

const post = require('../../controllers/exports/post')

routes.post('/', post);

module.exports = routes;