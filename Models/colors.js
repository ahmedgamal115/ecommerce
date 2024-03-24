const { default: mongoose, Schema } = require("mongoose");

const colorsSchema = new Schema({
    color: {
        type: String,
        required: true
    },
    colorName: {
        type: String,
        required: true
    }
},{timestamps:true})

const Colors = mongoose.model.Colors || mongoose.model('Colors',colorsSchema)

module.exports = Colors