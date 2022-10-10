const mongoose = require("mongoose");
const ValuesSchema = new mongoose.Schema({
    Board_id: {},
    Board_location: {},
    Measurements: [
        {
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
            timestamp: { type: Date, default: Date.now }
        }
    ],
},
    {
        timestamps: true
    }
)
const ValuesModel = mongoose.model("Values", ValuesSchema)
module.exports = ValuesModel
