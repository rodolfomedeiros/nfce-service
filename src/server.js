const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const config = require('./config/config');

const server = express();

server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(process.env.PORT || config.PORT, () => {
    console.log("Nota Service online...")
});