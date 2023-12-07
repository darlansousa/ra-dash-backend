const server_port = process.env.RA_API_PORT || 3000
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const helmet = require('helmet')
const cors = require('cors')
const morgan = require('morgan')


const app = express()

const whitelist = ['http://localhost:3001', 'http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) 

app.use('/', routes);

const startServer = (port = server_port) => {
    const server = app.listen(port, function () {
      console.log(`Server running on port ${server.address().port}`);
    });
};

module.exports = startServer;