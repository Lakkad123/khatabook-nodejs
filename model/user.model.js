const mongoose = require("mongoose")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
require("dotenv").config()
// passwordValidation summery:
// At least one lowercase alphabet i.e. [a-z]
// At least one uppercase alphabet i.e. [A-Z]
// At least one Numeric digit i.e. [0-9]
// At least one special character i.e. [‘@’, ‘$’, ‘.’, ‘#’, ‘!’, ‘%’, ‘*’, ‘?’, ‘&’, ‘^’]
// Also, the total length must be in the range [8-15]
const user = new mongoose.Schema({
    fullName: {
        type: String,
        validate: {
            validator: function (value) {
                return /[a-zA-z]{8,}/.test(value)
            },
            message: "Full Name Have Atleast 8 Character"
        },
        validate: {
            validator: function (value) {
                return /^[!a-zA-z]*$/.test(value)
            },
            message: "Full Name Only  Have Character"
        },
        required: [true, "fullName is required"]
    },
    emailId: {
        type: String,
        unique: true,
        validate: {
            validator: function (value) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
            },
            message: data => `${data.value} Is a Not Valid Email Format`
        },
        required: [true, "EmailAddress is required"]
    },
    contectNumber: {
        type: Number,
        unique: true,
        required: [true, "ContectNumber is required"],
        validate: {
            validator: function (number) {
                return /^[6-9][0-9]{9}$/.test(number);
            },
            message: property => `${property.value} is not valid phone Number`
        }
    },
    password: {
        type: String,
        required: [true, "password is required"],
        validate: {
            validator: function (password) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(password);
            },
            message: property => `${property.value} is not valid password`
        },

    },
    address: {
        type: String,
        required: [true, "address is required"],

    },
    businessName: {
        type: String
    },
    profilePicture: {
        type: String,
        required: [true, "imagePath is required"],

    },
    token: {
        type: String,
        required: [true, "token  is required"]
    }
})
user.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10)
})
user.methods.genrateToken = async function () {
    const token = await jwt.sign({ _id: this._id }, process.env.SECRET)
    this.token = token
    return token
}
    .exports = mongoose.model("user", user)