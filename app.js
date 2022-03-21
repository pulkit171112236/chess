const path = require('path')

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.set('view engine', 'ejs')
app.set('views', 'views')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

const chessRoutes = require('./routes/chess')

app.use('/', chessRoutes)

var PORT = process.env.PORT || 3000
const server = app.listen(PORT)

// initialize socket connection and check connection
const io = require('./socket').init(server)
io.on('connection', () => {
  console.log('Client connected!')
})
