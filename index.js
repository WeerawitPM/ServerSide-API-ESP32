const express = require('express');
const mongoose = require('mongoose');
const ValuesModel = require('./models/model_data');
const ESP32Model = require('./models/model_esp32');
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
const GetData = async (req, res) => {
    try {
        const data = await ValuesModel.find()
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
    try {
        const data = new ValuesModel(req.body)
        await data.save()
        res.json({ Message: "Temp Added Success", data })
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

const MeanTemperatureToday = async (req, res) => {
    try {
        const data = await ValuesModel.find()
        let mean = 0
        data.map((item) => {
            mean += item.Temperature_C
        })
        mean = mean / data.length
        res.json({ Message: "Mean Temperature Today", mean })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetWeekData = async (req, res) => {
    let TodayDate = req.params.date
    let TodayMonth = req.params.month
    let TodayYear = req.params.year

    try {
        const data = await ValuesModel.find()
        let today = []
        let today2 = []
        let meanTemp = 0
        let meanHum = 0

        data.map((item) => {
            if (item.Date == TodayDate && item.Month == TodayMonth && item.Year == TodayYear) {
                today.push(item)
            }
        })
        today.map((item) => {
            day = item.Day
            meanTemp += item.Temperature_C
            meanHum += item.Humadity
        })
        meanTemp = meanTemp / today.length
        meanHum = meanHum / today.length

        today2.push({ Today: day, MeanTemp: Number(meanTemp.toFixed(2)), MeanHum: Number(meanHum.toFixed(2)) })
        today2.push({ Today: "TuesDay", MeanTemp: 25, MeanHum: 60 })
        today2.push({ Today: "Wednesday", MeanTemp: 26, MeanHum: 61 })
        today2.push({ Today: "Thursday", MeanTemp: 27, MeanHum: 62 })
        today2.push({ Today: "Friday", MeanTemp: 28, MeanHum: 63 })
        today2.push({ Today: "Saturday", MeanTemp: 29, MeanHum: 64 })
        today2.push({ Today: "Sunday", MeanTemp: 30, MeanHum: 65 })

        // res.json({ Message: "Today Data", today })
        res.json(today2)
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

const GetAllBoard = async (req, res) => {
    try {
        const data = await ESP32Model.find()
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const FindBoardData = async (req, res) => {
    let Board_id = req.params.id
    try {
        const data = await ValuesModel.find({ Board_id })
        res.json({ Message: "Data Found", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const AddMeasurements = async (req, res) => {
    let Board_id = req.params.id
    let { Temperature_C, Temperature_F, Humadity, Day, Date, Month, Year, Time_Hours, Time_Minutes, Time_Seconds } = req.body
    try {
        const data = await ValuesModel.find({ Board_id })

        let board_id = ""
        let Measurements = []

        data.map((item) => {
            board_id = item.Board_id
            Measurements = item.Measurements
        })

        if (board_id == Board_id) {
            Measurements.push({ Temperature_C, Temperature_F, Humadity, Day, Date, Month, Year, Time_Hours, Time_Minutes, Time_Seconds })
            const data2 = await ValuesModel.findOneAndUpdate({ Board_id }, { Measurements })
            res.json({ Message: "Measurements Added Success", data2 })
        }
        else {
            res.json({ Message: "Board Not Found" })
        }
    } catch (error) { res.json({ Message: "Error", error }) }
}

//......................... APIs ........................
app.post("/", AddData)  // Adding data through post metheod & body
app.get("/", GetData)
app.get("/find/:id", FindData)
app.get("/add", AddData_Query) // Adding data through get method & query
app.delete("/delete/:id", DeleteData)
app.put("/update/:id", UpdateData)
app.get("/mean", MeanTemperatureToday)
app.get("/week/:date/:month/:year", GetWeekData)
app.post("/enroll", EnrollBoard)
app.get("/allboard", GetAllBoard)
app.get("/boarddata/:id", FindBoardData)

app.put("/addmeasurements/:id", AddMeasurements)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
