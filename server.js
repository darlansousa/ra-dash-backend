const express = require('express')

require('dotenv').config()

const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

var db = require('knex')({
  client: 'mysql2',
  connection: {
    host : '127.0.0.1',
    user : 'root',
    password : 'root',
    database : 'ra_collector'
  }
});


const complaints = require('./controllers/complaints')


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

app.use(
  '/api-docs',
  swaggerUi.serve, 
  swaggerUi.setup(swaggerDocument)
);

app.get('/', (req, res) => res.send('RA-Dash-Backend'))

app.get('/complaints', (req, res) => complaints.getComplaints(req, res, db))
app.get('/complaints/info', (req, res) => complaints.getComplaintsInfo(req, res, db))
app.get('/complaints/:id', (req, res) => complaints.getComplaintsById(req, res, db))
app.put('/complaints/:id/close', (req, res) => complaints.closeComplaints(req, res, db))
app.put('/complaints/:id', (req, res) => complaints.putAllData(req, res, db))
app.delete('/complaints/:id', (req, res) => complaints.deleteComplaints(req, res, db))

app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})