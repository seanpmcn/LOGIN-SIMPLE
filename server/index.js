const express = require('express')
const mysql = require('mysql')
const cors = require('cors')

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const bcrypt =  require('bcrypt')
const saltRounds = 10;

const { mysqlPassword } = require('./assets')

const app = express()

app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use(session({
    key: "userId",
    secret: "XXm5EtM8bw",
    resave: false,
    saveUninialized: false,
    cookie: {
        expires: 60 * 60 * 24 * 1000
    }
}))

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
                        req.session.user = result
                        console.log(req.session.user)
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