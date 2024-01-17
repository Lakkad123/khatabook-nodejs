require("dotenv").config()
const jwt = require("jsonwebtoken")
const user = require("../model/user.model")
exports.veryfyToken = async (req, res, next) => {
    try {
        const token = req.headers["authorization"]
        if (token) {
            const decode = await jwt.verify(token, process.env.SECRET)
            const data = await user.findById({ _id: decode._id })
            if (data) {
                req.data = data
                
                if (token == data.token) {
                    next()
                } else {
                    res.status(401).json({
                        message: "Unauthorized",
                        status: 401
                    })
                }
            }
            else {
                res.status(404).json({
                    message: "Data Not Found",
                    status: 404
                })
            }
        } else {

            res.status(403).json({
                message: "Forbidden",
                status: 403
            })

        }
    }
    catch (error) {
        console.log("Error", error.message);
        res.status(500).json({
            message: "Somthing Went Wrong   ",
            status: 500
        })
    }
}