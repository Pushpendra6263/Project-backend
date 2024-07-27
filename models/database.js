// require("dotenv").config({ path: './.env' });
const mongoose = require('mongoose');



exports.connectDatabase = async () => {

    try {
        await mongoose.connect(process.env.MONGODB)
        console.log("Database Connected");
    } catch (error) {
        console.log(error.message);
    }
}