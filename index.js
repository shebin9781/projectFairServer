
//Loads .env fille contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')
require("./DB/connection")


//create an Express application.
const pfSever = express()


//use cors in express server
pfSever.use(cors())
pfSever.use(express.json())
pfSever.use(router)
pfSever.use('/uploads',express.static('./uploads'))


const PORT =3000 || process.env.PORT
pfSever.listen(PORT,()=>{
    console.log(`Project Fair Server Started At PORT:${PORT}`);
})
//http://localhost:3000/
pfSever.get("/",(req,res)=>{
    res.status(200).send(`<h1 style="color:green">Project Fair Server Started and Waiting for clinte request!!!</h1>`)
})