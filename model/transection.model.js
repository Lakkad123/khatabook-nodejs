const mongoose = require("mongoose")
function formatDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if single digit
    const monthIndex = date.getMonth();
    const year = date.getFullYear().toString().slice(0); // Get the last two digits of the year
    const formattedDate = `${year}-${String(monthIndex + 1).padStart(
        2,
        "0"
    )}-${day}`; // Add leading zero if single digit
    return formattedDate;
}
const transection = new mongoose.Schema({
    userId: {
        type: Object,
        required: [true, "Id must be required"]

    },
    name: {
        type: String,
        required: [true, "Name must be required"]
    }, emailId: {
        type: String,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: data => `${data.value} Is a Not Valid Email Format`
        },
        required: [true, "EmailAddress is required"]
    },
    contactNumber: {
        type: Number,
        required: [true, "ContactNumber is required"],
        validate: {
            validator: function (value) {
                return /[0-9]{10}/.test(value);
            },
            message: 'MobileNumber length is Must Be 10 Digit'
        },


    },
    details: {
        type: String,
        required: [true, "Details is required"],
    },
    amount: {
        type: Number,
        required: [true, "Amount is required"],
    },
    date: {
        type: Date,
        default: formatDate(new Date().toISOString())

    },
    typeOfUser: {
        type: String,
        enum: ["customer", "supplier"],
        message: `{VALUE} is not supported`
    },
    typeOfTransection: {
        type: String,
        enum: ["credit", "debit"],
        message: `{VALUE} is not supported`
    },
    transectionMethod: {
        type: String,
        enum: ["bank", "cash"],
        message: `{VALUE} is not supported`
    },
    reminder: {
        type: Date
    }

}, { versionKey: false })
module.exports = mongoose.model("transection", transection)