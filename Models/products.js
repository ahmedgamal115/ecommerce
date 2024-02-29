const { default: mongoose, Schema } = require("mongoose");

const productsSchema = new Schema({
    image: {
        type: [String],
        require: true
    },
    status: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true
    },
    color: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
},{timestamps:true})

const Products = mongoose.model.Products || mongoose.model('Products',productsSchema)

module.exports = Products