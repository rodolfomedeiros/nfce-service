const express = require('express');
const NotaController = require('./controller/NotaController');
const config = require('./config/config');

const routes = express.Router();

routes.get(`/${config.routeNota}`, NotaController.info);

 module.exports = routes;