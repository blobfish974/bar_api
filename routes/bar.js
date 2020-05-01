// will contain all of my user related routes
const express = require('express')
const mysql = require('mysql')
const router = express.Router()



router.get("/bars", (req, res) => {
    const connection = getConnection()
    const queryString = "SELECT * FROM users"
    connection.query(queryString, (err, rows, fields) => {
      if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
      }
      res.json(rows)
    })
  })

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'eu-cdbr-west-03.cleardb.net',
    user: 'be62dcd438c346',
    password: 'c04f0943',
    database: 'heroku_2b7c598459ffda2'
    //mysql://be62dcd438c346:c04f0943@eu-cdbr-west-03.cleardb.net/heroku_2b7c598459ffda2?reconnect=true
})

function getConnection() {
    return pool
}

router.post('/user_create', (req, res) => {
    console.log("Trying to create a new user...")
    console.log("How do we get the form data???")
  
    console.log("First name: " + req.body.create_first_name)
    const firstName = req.body.create_first_name
    const lastName = req.body.create_last_name
  
    const queryString = "INSERT INTO users (first_name, last_name) VALUES (?, ?)"
    getConnection().query(queryString, [firstName, lastName], (err, results, fields) => {
      if (err) {
        console.log("Failed to insert new user: " + err)
        res.sendStatus(500)
        return
      }
  
      console.log("Inserted a new user with id: ", results.insertId);
      res.end()
    })
  })
  
router.get('/user/:id', (req, res) => {
    console.log("Fetching user with id: " + req.params.id)

    const connection = getConnection()

    const userId = req.params.id
    const queryString = "SELECT * FROM users WHERE id = ?"
    connection.query(queryString, [userId], (err, rows, fields) => {
        if (err) {
        console.log("Failed to query for users: " + err)
        res.sendStatus(500)
        return
        // throw err
        }

        console.log("I think we fetched users successfully")

        const users = rows.map((row) => {
        return {firstName: row.first_name, lastName: row.last_name}
        })

        res.json(users)
    })
})

module.exports = router