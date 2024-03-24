const { default: mongoose, Schema } = require("mongoose");

const productsSchema = new Schema({
    image: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Colors',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amounts:{
        type: Number,
        required: true
    }
},{timestamps:true})

const Products = mongoose.model.Products || mongoose.model('Products',productsSchema)

module.exports = Products