const { default: mongoose, Schema } = require("mongoose");

const ordersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        require: true,
    },
    otherPhone: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    size: {
        type: [String],
        required: true
    },
    amount: {
        type: [Number],
        required: true
    },
    payway:{
        type: String,
        required: true
    },
    orderNumber:{
        type: String
    },
    delivered:{
        type: Boolean,
        default: false
    },
    commentQ:{
        type: String
    },
    discountCode:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Promocodes'
    },
    productOrder: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Products',
        required: true
    }
},{timestamps:true})

const Orders = mongoose.model.Orders || mongoose.model('Orders',ordersSchema)

module.exports = Orders