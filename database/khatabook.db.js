const mongoose = require("mongoose")

mongoose.connect("mongodb://127.0.0.1:27017/khataBook")
    .then(() => { console.log("Connected With khataBook Database"); })
    .catch((err) => { console.log("Error:-connect Database:", err); })