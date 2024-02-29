const { default: mongoose, Schema } = require("mongoose");

const ordersSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
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
        require: true
    },
    size: {
        type: [String],
        require: true
    },
    amount: {
        type: [Number],
        require: true
    },
    payway:{
        type: String,
        require: true
    },
    orderNumber:{
        type: Number
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
        require: true
    }
},{timestamps:true})

const Orders = mongoose.model.Orders || mongoose.model('Orders',ordersSchema)

module.exports = Orders