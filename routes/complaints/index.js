const routes = require('express').Router();
const path  = '../../controllers/complaints/';

const get = require(`${path}/get`)
const info = require(`${path}/info`)
const ai = require(`${path}/ai`)
const export_complaint = require(`${path}/export`)
const put = require(`${path}/put`)
const close_complaint = require(`${path}/close`)
const delete_complaint = require(`${path}/delete`)

routes.get('/', get);
routes.get('/info', info);
routes.get('/ai', ai);
routes.get('/export', export_complaint);
routes.get('/:id', get);
routes.put('/:id', put)
routes.put('/:id/close', close_complaint)
routes.delete('/:id', delete_complaint);

module.exports = routes;