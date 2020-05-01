// load our app server using express somehow....
const express = require('express')
const app = express()
const morgan = require('morgan')
const mysql = require('mysql')

const bodyParser = require('body-parser')

const barData = require('./data/barData.js')

app.use(bodyParser.urlencoded({extended: false}))


app.use(express.static('./public'))

app.use(morgan('short'))

const router = require('./routes/user.js')

app.use(router)

app.get("/", (req, res) => {
  console.log("Responding to root route")
  //res.send("Hello from ROOOOOT")
  res.send(barData.data);
})

app.post("/new_bar", (req, res) => {
  console.log("Post query")
  //res.send("Hello from ROOOOOT")
  res.send("Post query");
})

const PORT = process.env.PORT || 3003
// localhost:PORT
app.listen(PORT, () => {
  console.log("Server is up and listening on: " + PORT)
})
