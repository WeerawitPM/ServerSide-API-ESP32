const express = require('express');
const mongoose = require('mongoose');
const ValuesModel = require('./models/model_data');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000

var cors = require('cors');

app.use(express.json(), cors()) // for parsing application/json);

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

//................... Get .........................
const GetData = async (req, res) => {
    try {
        const data = await ValuesModel.find()
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const FindBoardData = async (req, res) => {
    let Board_id = req.params.id
    let Measurements = {}
    try {
        const data = await ValuesModel.find({ Board_id })

        data.map((item) => {
            Measurements = item.Measurements
        })

        res.json({ Measurements })
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

//................... Post .........................
const AddData = async (req, res) => {
    try {
        const data = new ValuesModel(req.body)
        await data.save()
        res.json({ Message: "Temp Added Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const EnrollBoard = async (req, res) => {
    let { Board_id, Board_location } = req.body

    try {
        let Board_id2 = ""
        const data = await ValuesModel.find({ Board_id })

        data.map((item) => {
            Board_id2 = item.Board_id
        })

        if (Board_id2 == Board_id) {
            res.json({ Message: "Board Already Enrolled" })
        }
        else {
            const data2 = new ValuesModel({ Board_id, Board_location })
            data2.save()
            res.json({ Message: "Board Enrolled Success", data2 })
        }

    } catch (error) { res.json({ Message: "Error", error }) }
}

//................... Put .........................
const AddMeasurements = async (req, res) => {
    let Board_id = req.params.id
    let { Temperature_C, Temperature_F, Humadity, Day, Date, Month, Year, Time_Hours, Time_Minutes, Time_Seconds } = req.body
    let DateTime = "Date:" + Date + "/" + Month + "/" + Year + " Time:" + Time_Hours + ":" + Time_Minutes + ":" + Time_Seconds

    try {
        const data = await ValuesModel.find({ Board_id })

        let board_id = ""
        let Measurements = []

        data.map((item) => {
            board_id = item.Board_id
            Measurements = item.Measurements
        })

        if (board_id == Board_id) {
            Measurements.push({ Temperature_C, Temperature_F, Humadity, Day, Date, Month, Year, Time_Hours, Time_Minutes, Time_Seconds, DateTime })
            const data2 = await ValuesModel.findOneAndUpdate({ Board_id }, { Measurements })
            res.json({ Message: "Measurements Added Success", data2 })
        }
        else {
            res.json({ Message: "Board Not Found" })
        }
    } catch (error) { res.json({ Message: "Error", error }) }
}

//................... Delete .........................
const DeleteData = async (req, res) => {
    let _id = req.params.id
    try {
        const data = await ValuesModel.findByIdAndDelete(_id)
        res.json({ Message: "Data Deleted Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const DeleteBoard = async (req, res) => {
    let Board_id = req.params.id
    try {
        const data = await ValuesModel.findOneAndDelete({ Board_id })
        res.json({ Message: "Board Deleted Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

//................... EndControllers .........................

//......................... APIs ........................

//......................... Get .........................

app.get("/", GetData)
app.get("/add", AddData_Query) // Adding data through get method & query
app.get("/boarddata/:id", FindBoardData)

//......................... Post ........................

app.post("/", AddData)  // Adding data through post metheod & body
app.post("/enroll", EnrollBoard)

//......................... Put .........................

app.put("/addmeasurements/:id", AddMeasurements)

//......................... Delete ......................

app.delete("/delete/:id", DeleteData)
app.delete("/deleteboard/:id", DeleteBoard)

//......................... EndAPIs ........................

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
