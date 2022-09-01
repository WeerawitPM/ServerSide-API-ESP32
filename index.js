const express = require('express');
const mongoose = require('mongoose');
const ValuesModel = require('./models/models');
const app = express()
require ('dotenv').config();
const port = process.env.PORT || 5000

app.use(express.json())

// .................... DB Config .......................
const DBConnection = ()=>{
    return mongoose.connect(process.env.CONNECTION_STRING,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result)=>{console.log("DB CONNECTED SUCCESSFULLY")})
    .catch((error)=>{console.log(error)})
}
DBConnection()

//................... Controllers .........................
const GetData = async(req,res)=>{
    try {
        const data = await ValuesModel.find()
        // res.json({Message:"All Data",data})
        res.json(data)
    }catch (error) { res.json({Message:"Error",error})}
}

const AddData = async(req,res)=>{
    let {Temperature_C2,Humadity2} = req.body
    let Temperature_F = 1.8*Temperature_C2+32
    var Temperature_C = Number(Temperature_C2)
    var Humadity = Number(Humadity2)
    try {
        // console.log(typeof Temperature_C)
        // console.log(typeof Humadity)
        const data = new ValuesModel({Temperature_C,Temperature_F,Humadity})
        await data.save()
        res.json({Message:"Data Added Success",data})
    }catch (error) {res.json({Message:"Error",error})}
}

const AddData_Query = async(req,res)=>{
    let Temperature_C2 = req.query.temp
    let Humadity2 = req.query.hum
    let Temperature_F = 1.8*Temperature_C2+32
    var Temperature_C = Number(Temperature_C2)
    var Humadity = Number(Humadity2)
    try {
        // console.log(typeof Temperature_C)
        // console.log(typeof Humadity)
        const data = new ValuesModel({Temperature_C,Temperature_F,Humadity})
        await data.save()
        res.json({Message:"Temp Added Success",data})
    }catch (error) {res.json({Message:"Error",error})}
}

//......................... APIs ........................
app.get("/",GetData)
app.post("/",AddData)  // Adding data through post metheod & body
app.get("/add",AddData_Query) // Adding data through get method & query

app.listen(port, () => console.log(`Example app listening on port ${port}!`))