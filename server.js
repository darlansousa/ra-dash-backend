const express = require('express')

require('dotenv').config()

const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

const host = `${process.env.RA_API_DB_HOST || '127.0.0.1'}`
const user = `${process.env.RA_API_DB_USER || 'root'}`
const password = `${process.env.RA_API_DB_PASS || 'root'}`
const database = `${process.env.RA_API_DB_NAME || 'ra_collector'}`

var db = require('knex')({
  client: 'mysql2',
  connection: {
    host : host,
    user : user,
    password : password,
    database : database
  }
});


const complaints = require('./controllers/complaints')
const classifications = require('./controllers/complaints-classifications')
const export_items = require('./controllers/exports')
const dashboard = require('./controllers/dashboard')


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
app.get('/complaints/ai', (req, res) => complaints.getComplaintsAIClassifications(req, res, db))
app.get('/complaints/export', (req, res) => complaints.getComplaintsToExport(req, res, db))
app.get('/complaints/:id', (req, res) => complaints.getComplaintsById(req, res, db))
app.put('/complaints/:id/close', (req, res) => complaints.closeComplaints(req, res, db))
app.put('/complaints/:id', (req, res) => complaints.putAllData(req, res, db))
app.delete('/complaints/:id', (req, res) => complaints.deleteComplaints(req, res, db))

app.get('/classifications', (req, res) => classifications.getComplaintsClassifications(req, res, db))

app.post('/exports', (req, res) => export_items.insertExports(req, res, db))

app.get('/dash', (req, res) => dashboard.getDataAnalysis(req, res, db))


app.listen(process.env.RA_API_PORT || 3000, () => {
  console.log(`app is running on port ${process.env.RA_API_PORT || 3000}`)
})