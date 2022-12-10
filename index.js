const express = require('express');
const mongoose = require('mongoose');
const ValuesModel = require('./models/model_data');
const app = express();

require('dotenv').config();
const port = process.env.PORT || 5000
const moment = require('moment');

var cors = require('cors');
app.use(express.json(), cors());
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

const GetDataLatest = async (req, res) => {
    try {
        const data = await ValuesModel.find().sort({ _id: -1 }).limit(80)
        data.reverse()
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetYesterdayData = async (req, res) => {
    yesterday = moment().add(-1, 'days').format('DD-MM-YYYY');
    try {
        const data = await ValuesModel.find({ AllDateTime2: { $lte: yesterday } })
        data.reverse()
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetTodayData = async (req, res) => {
    today = moment().format('DD-MM-YYYY');
    try {
        const data = await ValuesModel.find({ AllDateTime2: { $gte: today } })
        data.reverse()
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetAvgDataToday = async (req, res) => {
    today = moment().add(-1, "days").format('DD-MM-YYYY');
    try {
        const data = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $gte: today } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            }
        ])
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetWeekData = async (req, res) => {
    today = moment().format('DD-MM-YYYY');
    yesterday1 = moment().add(-1, 'days').format('DD-MM-YYYY');
    yesterday2 = moment().add(-2, 'days').format('DD-MM-YYYY');
    yesterday3 = moment().add(-3, 'days').format('DD-MM-YYYY');
    yesterday4 = moment().add(-4, 'days').format('DD-MM-YYYY');
    yesterday5 = moment().add(-5, 'days').format('DD-MM-YYYY');
    yesterday6 = moment().add(-6, 'days').format('DD-MM-YYYY');
    data = []
    try {
        const data1 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: today } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: 1,
                    Humadity: 1,
                    Date: today
                }
            }
        ])

        const data2 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: yesterday1 } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: 1,
                    Humadity: 1,
                    Date: yesterday1
                }
            }
        ])

        const data3 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: yesterday2 } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: 1,
                    Humadity: 1,
                    Date: yesterday2
                }
            }
        ])

        const data4 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: yesterday3 } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: 1,
                    Humadity: 1,
                    Date: yesterday3
                }
            }
        ])

        const data5 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: yesterday4 } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" },
                    Date: yesterday4
                }
            }
        ])

        const data6 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: yesterday5 } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: 1,
                    Humadity: 1,
                    Date: yesterday5
                }
            }
        ])

        const data7 = await ValuesModel.aggregate([
            {
                $match: { AllDateTime2: { $lte: yesterday6 } }
            },
            {
                $group: {
                    _id: null,
                    Temperature_C: { $avg: "$Temperature_C" },
                    Humadity: { $avg: "$Humadity" }
                }
            },
            {
                $project: {
                    _id: 0,
                    Temperature_C: 1,
                    Humadity: 1,
                    Date: yesterday6
                }
            }
        ])

        data7.map((item) => {
            data.push(item)
        })
        data6.map((item) => {
            data.push(item)
        })
        data5.map((item) => {
            data.push(item)
        })
        data4.map((item) => {
            data.push(item)
        })
        data3.map((item) => {
            data.push(item)
        })
        data2.map((item) => {
            data.push(item)
        })
        data1.map((item) => {
            data.push(item)
        })

        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetAvgTemp = async (req, res) => {
    try {
        const data = await ValuesModel.aggregate([
            {
                $group: {
                    _id: null,
                    avg: { $avg: "$Temperature_C" }
                },
            }
        ])
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
    let Date = req.query.bb
    let Month = req.query.cc
    let Year = req.query.dd
    let Time_Hours = req.query.ee
    let Time_Minutes = req.query.ff
    let Time_Seconds = req.query.gg
    // var Day = String(Day2)

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

//......................... APIs ........................
app.post("/", AddData)  // Adding data through post metheod & body
app.get("/", GetData)
app.get("/latest", GetDataLatest)
app.get("/today", GetTodayData)
app.get("/yesterday", GetYesterdayData)
app.get("/week", GetWeekData)
// app.get("/week", GetWeekData)
app.get("/avg", GetAvgTemp)
app.get("/avgtoday", GetAvgDataToday)
app.get("/find/:id", FindData)
app.get("/add", AddData_Query) // Adding data through get method & query
app.delete("/delete/:id", DeleteData)
app.put("/update/:id", UpdateData)
app.get("/mean", MeanTemperatureToday)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))