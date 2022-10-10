const mongoose = require("mongoose");
const ValuesSchema = new mongoose.Schema({
    Board_id: {},
    Board_location: {},
},
    {
        timestamps: true
    })
const ESP32Model = mongoose.model("esp32", ValuesSchema)
module.exports = ESP32Model
