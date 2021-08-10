const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bcrypt =  require('bcrypt')
const saltRounds = 10;

const { mysqlPassword } = require('./assets')

const app = express()

app.use(express.json())
app.use(cors())

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: mysqlPassword,
    database: "login_system"
})

app.post('/register', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    bcrypt.hash(password, saltRounds, (err, hash) => {

        if(err){
            console.log(err)
        }

        db.query(
            "INSERT INTO login_system.users (username, password) VALUES (?,?)", 
            [username, hash],
            (err, result) => {
                if(err){
                    console.log(err)
                }
            }
        )
    })
    
})

app.post('/login', (req,res) => {
    
    const username = req.body.username
    const password = req.body.password

    

    db.query(
        "SELECT * FROM login_system.users WHERE username = ?", 
        username,
        (err, result) => {
            if(err){
                res.send({err: err})
            }

            if(result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if(response){
                        res.send(result)
                    }else{
                        res.send({message: "wrong username or password"})
                    }
                })
            }else{
                res.send({message: "User does not exist"})
             }
            
        }
    )

})

app.listen(3001, () => {
    console.log("running on port 3001")
})