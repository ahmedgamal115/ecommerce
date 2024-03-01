const { default: mongoose } = require("mongoose");
require('dotenv').config()

const dbConnect = async()=>{
    try {
        await mongoose.connect(process.env.MongoDBURL)
        console.log("Database Connected successfull...")
    } catch (error) {
        console.error(error)
    }
}

module.exports = dbConnect