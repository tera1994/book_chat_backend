const mongoose = require("mongoose");
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://tera1994:01250622@cluster0.33zlhmc.mongodb.net/appDataBase?retryWrites=true&w=majority&appName=Cluster0")
    } catch (error) {
        throw error;
    }
};
module.exports = connectDB;
