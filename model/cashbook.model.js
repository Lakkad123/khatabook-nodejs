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
const cashbook = new mongoose.Schema({
    userId: {
        type: Object,
        required: [true, "Id must be required"]

    }, details: {
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
    }, typeOfTransection: {
        type: String,
        enum: ["credit", "debit"],
        message: `{VALUE} is not supported`
    },
    transectionMethod: {
        type: String,
        enum: ["bank", "cash"],
        message: `{VALUE} is not supported`
    },
})
module.exports = mongoose.model("cashbook", cashbook)