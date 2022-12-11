const mongoose = require("mongoose");
const BoardSchema = new mongoose.Schema({
    Board_id: {},
    Board_Location: {},
},
    {
        timestamps: true
    }
)
const BoardModel = mongoose.model("Board", BoardSchema)
module.exports = BoardModel
