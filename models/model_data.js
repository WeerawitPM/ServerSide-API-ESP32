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
    AllDateTime: {
        type: String,
        default: function () {
            return this.Date + "-" + this.Month + "-" + this.Year + "-" + this.Day + " " + this.Time_Hours + ":" + this.Time_Minutes + ":" + this.Time_Seconds
        }
    },
    AllDateTime2: {
        type: String,
        default: function () {
            return this.Date + "-" + this.Month + "-" + this.Year
        }
    },
},
    {
        timestamps: true
    }
)
const ValuesModel = mongoose.model("Values", ValuesSchema)
module.exports = ValuesModel
