const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING).then(
    result=>{
        console.log("mongodb Atlas connection with pfServer");
    }
).catch(err=>{
    console.log("connection Failed!!");
    console.log(err);
})