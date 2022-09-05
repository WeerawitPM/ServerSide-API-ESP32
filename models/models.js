const mongoose = require("mongoose");
const ValuesSchema = new mongoose.Schema({
    Temperature_C : {},
    Temperature_F : {},
    Humadity: {},
},
{
    timestamps:true
})
 const ValuesModel = mongoose.model("Values",ValuesSchema)
 module.exports = ValuesModel
