const mongoose = require("mongoose");
const ValuesSchema = new mongoose.Schema({
    Board_id: {},
    Temperature_C: {},
    Temperature_F: {},
    Humadity: {},
    Day: {},
    Date: {},
    Month: {},
    Year: {},
    Time_Hours: {},
    Time_Minutes: {},
    Time_Seconds: {},
},
    {
        timestamps: true
    })
const ValuesModel = mongoose.model("Values", ValuesSchema)
module.exports = ValuesModel
