const express = require('express');
const mongoose = require('mongoose');
const ValuesModel = require('./models/models');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000

app.use(express.json())

// .................... DB Config .......................
const DBConnection = () => {
    return mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        .then((result) => { console.log("DB CONNECTED SUCCESSFULLY") })
        .catch((error) => { console.log(error) })
}
DBConnection()

//................... Controllers .........................
const GetData = async (req, res) => {
    try {
        const data = await ValuesModel.find()
        // res.json({Message:"All Data",data})
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const FindData = async (req, res) => {
    let _id = req.params.id
    try {
        const data = await ValuesModel.findById(_id)
        res.json({ Message: "Data Found", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const AddData = async (req, res) => {
    let { Temperature_C, Temperature_F, Humadity, } = req.body

    try {
        // console.log(typeof Temperature_C)
        // console.log(typeof Humadity)
        const data = new ValuesModel(req.body)
        await data.save()
        res.json({ Message: "Data Added Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const AddData_Query = async (req, res) => {
    let Board_id = req.query.bi

    let Temperature_C2 = req.query.temp
    let Temperature_F2 = req.query.tempf
    let Humadity2 = req.query.hum

    var Temperature_C = Number(Temperature_C2)
    var Temperature_F = Number(Temperature_F2)
    var Humadity = Number(Humadity2)

    let Day = req.query.aa
    let Date2 = req.query.bb
    let Month2 = req.query.cc
    let Year2 = req.query.dd
    let Time_Hours2 = req.query.ee
    let Time_Minutes2 = req.query.ff
    let Time_Seconds2 = req.query.gg

    // var Day = String(Day2)
    var Date = Number(Date2)
    var Month = Number(Month2)
    var Year = Number(Year2)
    var Time_Hours = Number(Time_Hours2)
    var Time_Minutes = Number(Time_Minutes2)
    var Time_Seconds = Number(Time_Seconds2)

    try {
        // console.log(typeof Temperature_C)
        // console.log(typeof Humadity)
        const data = new ValuesModel({ Board_id, Temperature_C, Temperature_F, Humadity, Day, Date, Month, Year, Time_Hours, Time_Minutes, Time_Seconds })
        await data.save()
        res.json({ Message: "Temp Added Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const DeleteData = async (req, res) => {
    let _id = req.params.id
    try {
        const data = await ValuesModel.findByIdAndDelete(_id)
        res.json({ Message: "Data Deleted Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const UpdateData = async (req, res) => {
    let _id = req.params.id
    let { Temperature_C, Temperature_F, Humadity } = req.body
    try {
        const data = await ValuesModel.findByIdAndUpdate(_id, { Board_id, Temperature_C, Temperature_F, Humadity, Day, Date, Month, Year, Time_Hours, Time_Minutes, Time_Seconds })
        res.json({ Message: "Data Updated Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

//......................... APIs ........................
app.post("/", AddData)  // Adding data through post metheod & body
app.get("/", GetData)
app.get("/find/:id", FindData)
app.get("/add", AddData_Query) // Adding data through get method & query
app.delete("/delete/:id", DeleteData)
app.put("/update/:id", UpdateData)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
