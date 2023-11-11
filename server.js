const express = require('express')

require('dotenv').config()

const helmet = require('helmet')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
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
const complainers = require('./controllers/complainers')

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
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

// App Routes - Auth
app.get('/', (req, res) => res.send('RA-Dash-Backend'))

app.get('/complaints', (req, res) => complaints.getComplaints(req, res, db))
app.post('/complaints', (req, res) => complaints.postComplaints(req, res, db))
app.put('/complaints', (req, res) => complaints.putComplaints(req, res, db))
app.delete('/complaints', (req, res) => complaints.deleteComplaints(req, res, db))


app.get('/complainers', (req, res) => complainers.getComplainers(req, res, db))
app.post('/complainers', (req, res) => complainers.postComplainers(req, res, db))
app.put('/complainers', (req, res) => complainers.putComplainers(req, res, db))
app.delete('/complainers', (req, res) => complainers.deleteComplainers(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
})