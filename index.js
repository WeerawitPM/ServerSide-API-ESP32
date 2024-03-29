const express = require('express');
const mongoose = require('mongoose');
const ValuesModel = require('./models/model_data');
const BoardModel = require('./models/model_board');

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

const GetCurrentWeekData = async (req, res) => {
    startOfWeek = moment().startOf('week').format('DD-MM-YYYY');
    endOfWeek = moment().endOf('week').format('DD-MM-YYYY');
    data = []
    try {
        for (let i = 0; i < 7; i++) {
            const data1 = await ValuesModel.aggregate([
                {
                    $match: { AllDateTime2: { $gte: startOfWeek, $lte: endOfWeek } }
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
                        Date: startOfWeek
                    }
                }
            ])
            data1.map((item) => {
                data.push(item)
            })
            startOfWeek = moment(startOfWeek, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
        }
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetCurrentMonthData = async (req, res) => {
    startOfMonth = moment().startOf('month').format('DD-MM-YYYY');
    endOfMonth = moment().endOf('month').format('DD-MM-YYYY');
    data = []
    try {
        for (let i = 0; i < 30; i++) {
            const data1 = await ValuesModel.aggregate([
                {
                    $match: { AllDateTime2: { $gte: startOfMonth, $lte: endOfMonth } }
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
                        Date: startOfMonth
                    }
                }
            ])
            data1.map((item) => {
                data.push(item)
            })
            startOfMonth = moment(startOfMonth, 'DD-MM-YYYY').add(1, 'days').format('DD-MM-YYYY');
        }
        res.json(data)
    } catch (error) { res.json({ Message: "Error", error }) }
}

// const GetCurrentYearData = async (req, res) => {
//     startOfYear = moment().startOf('year').format('DD-MM-YYYY');
//     endOfYear = moment().endOf('year').format('DD-MM-YYYY');
//     data = []
//     try {
//         for (let i = 0; i < 12; i++) {
//             const data1 = await ValuesModel.aggregate([
//                 {
//                     $match: { AllDateTime2: { $gte: startOfYear, $lte: endOfYear } }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         Temperature_C: { $avg: "$Temperature_C" },
//                         Humadity: { $avg: "$Humadity" }
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 0,
//                         Temperature_C: 1,
//                         Humadity: 1,
//                         Date: startOfYear
//                     }
//                 }
//             ])
//             data1.map((item) => {
//                 data.push(item)
//             })
//             startOfYear = moment(startOfYear, 'DD-MM-YYYY').add(1, 'months').format('DD-MM-YYYY');
//         }
//         res.json(data)
//     } catch (error) { res.json({ Message: "Error", error }) }
// }

// const GetWeekData = async (req, res) => {
//     today = moment().format('DD-MM-YYYY');
//     data = []
//     try {
//         for (let i = 0; i < 7; i++) {
//             const data1 = await ValuesModel.aggregate([
//                 {
//                     $match: { AllDateTime2: { $lte: today } }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         Temperature_C: { $avg: "$Temperature_C" },
//                         Humadity: { $avg: "$Humadity" }
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 0,
//                         Temperature_C: 1,
//                         Humadity: 1,
//                         Date: today
//                     }
//                 }
//             ])
//             data1.map((item) => {
//                 data.push(item)
//             })
//             today = moment(today, 'DD-MM-YYYY').add(-1, 'days').format('DD-MM-YYYY');
//         }
//         data.reverse()
//         res.json(data)
//     } catch (error) { res.json({ Message: "Error", error }) }
// }

// const GetDataDateofMonth = async (req, res) => {
//     today = moment().format('DD-MM-YYYY');
//     data = []
//     try {
//         for (let i = 0; i < 30; i++) {
//             const data1 = await ValuesModel.aggregate([
//                 {
//                     $match: { AllDateTime2: { $lte: today } }
//                 },
//                 {
//                     $group: {
//                         _id: null,
//                         Temperature_C: { $avg: "$Temperature_C" },
//                         Humadity: { $avg: "$Humadity" }
//                     }
//                 },
//                 {
//                     $project: {
//                         _id: 0,
//                         Temperature_C: 1,
//                         Humadity: 1,
//                         Date: today
//                     }
//                 }
//             ])
//             data1.map((item) => {
//                 data.push(item)
//             })
//             today = moment(today, 'DD-MM-YYYY').add(-1, 'days').format('DD-MM-YYYY');
//         }
//         data.reverse()
//         res.json(data)
//     } catch (error) { res.json({ Message: "Error", error }) }
// }

const GetDataMonthofYear = async (req, res) => {
    today = moment().format('MM-YYYY');
    data = []
    try {
        for (let i = 0; i < 12; i++) {
            const data1 = await ValuesModel.aggregate([
                {
                    $match: { Month : { $lte: today } , Year : { $gte: today } }
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
                        Date: today2 = moment(today, 'MM-YYYY').format('MMMM-YYYY')
                    }
                }
            ])
            data1.map((item) => {
                data.push(item)
            })
            today = moment(today, 'MM-YYYY').add(-1, 'months').format('MM-YYYY');
        }
        data.reverse()
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

//................................................

//.................. Board .........................

const RegisterBoard = async (req, res) => {
    let { Board_id, Board_Location } = req.body
    try {
        const data = await BoardModel.findOne({ Board_id })
        if (data) {
            res.json({ Message: "Board Already Registered" })
        }
        else {
            const data = new BoardModel({ Board_id, Board_Location })
            await data.save()
            res.json({ Message: "Board Registered Success", data })
        }
    } catch (error) { res.json({ Message: "Error", error }) }
}

const GetBoard = async (req, res) => {
    try {
        const data = await BoardModel.find()
        res.json({ Message: "Board Found", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const FindBoard = async (req, res) => {
    let Board_id = req.params.id
    try {
        const data = await BoardModel
            .findOne({ Board_id })
        res.json({ Message: "Board Found", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const DeleteBoard = async (req, res) => {
    let Board_id = req.params.id
    try {
        const data = await BoardModel.findOneAndDelete({ Board_id })
        res.json({ Message: "Board Deleted Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

const UpdateBoard = async (req, res) => {
    let Board_id = req.params.id
    let { Board_Location } = req.body
    try {
        const data = await BoardModel.findOneAndUpdate({ Board_id }, { Board_Location })
        res.json({ Message: "Board Updated Success", data })
    } catch (error) { res.json({ Message: "Error", error }) }
}

//................................................

//......................... APIs ........................
app.post("/", AddData)  // Adding data through post metheod & body
app.get("/add", AddData_Query) // Adding data through get method & query
app.get("/", GetData)
app.get("/find/:id", FindData)
app.get("/latest", GetDataLatest)
app.get("/today", GetTodayData)
app.get("/yesterday", GetYesterdayData)
app.get("/week", GetCurrentWeekData)
app.get("/month", GetCurrentMonthData)
app.get("/year", GetDataMonthofYear)
app.delete("/delete/:id", DeleteData)
app.patch("/update/:id", UpdateData)
//................................................

//......................... Board APIS ........................
app.post("/board", RegisterBoard)
app.get("/board", GetBoard)
app.get("/board/:id", FindBoard)
app.delete("/board/:id", DeleteBoard)
app.patch("/board/:id", UpdateBoard)
//................................................

app.listen(port, () => console.log(`Example app listening on port ${port}!`))