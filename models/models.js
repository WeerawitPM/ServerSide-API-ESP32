const mongoose = require("mongoose");
const ValuesSchema = new mongoose.Schema({
    Temperature_C : {},
    Temperature_F : {},
    Humadity: {},
    MaxTemperature_C : {},
    MaxHumadity: {},
},
{
    timestamps:true
})
 const ValuesModel = mongoose.model("Values",ValuesSchema)
 module.exports = ValuesModel
