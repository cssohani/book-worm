

const express = require("express");
const cors = require("cors");
const postgres = require("pg").Pool;
const bcrypt = require("bcrypt")
const app = express();
const bodyParser = require('body-parser')
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();
JWT_KEY = process.env.JWT_KEY;

app.use(cors({
    origin: "http://localhost:5173",
    credentials : true
}));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: true
}))



app.listen(8080, () => {
    console.log("Server running on port: 8080")
})

const db = new postgres({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT
});

db.connect(() => {
    
    console.log("Successsfully connected to database")
})

app.get('/books', (req, res) => {
    //const id = Number(req.params.id);
    const sql_query = 'SELECT * FROM books';
    db.query(sql_query, (err, result) => {
        if(err){
            return res.json(err);
        }
        else{
            return res.status(200).json(result.rows);
        }
    });

})

app.post("/books", async (req, res) => {
    const { title, authors, thumbnail, publisheddate } = req.body;
    try{
        const checkBook = await db.query("SELECT * FROM books WHERE title = $1", [title]);
        if(checkBook.rows.length > 0){
            res.status(400).json({error: "Book already exists"})
        }
        const newBook = await db.query("INSERT INTO books(title, authors, thumbnail, publisheddate) VALUES($1, $2, $3, $4) RETURNING *", [title, authors, thumbnail, publisheddate]);
        res.status(201).json({message: "Book added successfully"});
    }catch(e){
        res.status(500).json({error: e.message});
    }
  });
  

app.post('/register', async (req, res) => {
    const { email, password } = req.body;
    if(!password){
        res.status(400).json({error: "Password is required"})
    }
    try{
        const checkUser = await db.query("SELECT * FROM Users WHERE email=$1", [email]);
        if (checkUser.rows.length > 0){
            res.status(400).json({ error: "User already exists"});
        }
         const hashPass = await bcrypt.hash(password, 10);
         const newUser = await db.query("INSERT INTO Users(email, password) VALUES($1, $2) RETURNING *", [email, hashPass]);
         res.status(201).json({message: "User created successfully", user: newUser.rows[0]});
    }catch(e){
        res.status(500).json({error: e.message});
    }
    
})

app.post('/', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try{
        const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
        if(checkUser.rows.length === 0){
            return res.status(400).json({error: "Invalid Credentials"});
        }

        const user = checkUser.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch){
            return res.status(400).json({error: "Invalid Credentials"});
        }
        const token = jwt.sign({userId : user.id}, JWT_KEY, {expiresIn : "1h"});
        
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "Strict",
            maxAge: 3600000
        })
        res.json({message: "Login success" ,token});


    }catch(err){
        res.status(500).json({ error: err.message });
    }
})

app.post("/logout", (req, res) => {
    res.clearCookie('token',
        { httpOnly: true,
          sameSite: "Strict",
          secure: false});

    res.json({message : "Logout successful"})
})

app.delete('/books/:id', (req, res) => {
    const id = Number(req.params.id);
    const sql_query = "DELETE FROM books WHERE id=$1";
    db.query(sql_query, [id], (err, result) => {
        if(err){
            return res.json(err);
        }
        else{
            return res.status(200).send("Student is successfully deleted from database");
        }
    })
})