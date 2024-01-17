const user = require("../model/user.model")
const transection = require("../model/transection.model")
const bcrypt = require("bcrypt");
exports.insertUser = async (req, res) => {
    try {
        const alreadyFind = await user.findOne({ email: req.body.emailId })
        if (alreadyFind) 
            return res.status(403).json({
                status: 403,
                message: "User Already Exist",
            })
        
        else {
            const data = await new user({
                fullName: req.body.fullName,
                emailId: req.body.emailId,
                contectNumber: req.body.contectNumber,
                password: req.body.password,
                address: req.body.address,
                businessName: req.body.businessName,
                profilePicture: req.body.profilePicture,
                // transection: re
            })
            const token = await data.genrateToken()
            console.log(token);
            const savedData = await data.save()
            res.status(201).json({
                message: "User Data Inserted SuccessFully",
                code: 201,
                data: savedData,
            });
        }
    } catch (error) {

        res.status(500).json({
            message: `User Data Insert Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.updateUser = async (req, res) => {
    try {

        const alreadyFind = await user.findOne({ emailId: req.body.emailId })
        if (alreadyFind) {
            res.status(403).json({
                status: 403,
                message: "User Have Already Account Cannot Update ",
            })
            return
        } else {
            const data = await user.findByIdAndUpdate({ _id: req.data.id }, {
                $set: {
                    fullName: req.body.fullName,
                    emailId: req.body.emailId,
                    contectNumber: req.body.contectNumber,
                    password: req.body.password,
                    address: req.body.address,
                    businessName: req.body.businessName,
                    profilePicture: req.body.profilePicture,
                }
            },
                { new: true }
            )

            res.status(200).json({
                message: "User Data Updated SuccessFully",
                status: 200,
                data: data,
            });

        }

    } catch (error) {
        res.status(500).json({
            message: `User Data Update Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.deleteUser = async (req, res) => {
    try {

        const data = await user.findByIdAndDelete({ _id: req.data.id })
        res.status(200).json({
            message: "User Data Deleted SuccessFully",
            status: 200,
            data: data,
        });

    } catch (error) {

        res.status(500).json({
            message: `User Data Delete Error  ${error.message}`,
            status: 500,
        });
    }
}

exports.loginUser = async (req, res) => {
    try {
        const userFind = await user.findOne({ emailId: req.body.emailId })
        if (userFind) {
            if (await bcrypt.compare(req.body.password, userFind.password)) {
                res.status(200).json({
                    message: "login SuccessFully",
                    status: 200,
                    data: userFind,
                });
            } else {
                res.status(401).json({
                    message: "User Credential Not Match",
                    status: 401,

                });
            }
        } else {
            res.status(200).json({
                message: "userNot found Please Registered",
                status: 200,
            });
        }
    } catch (error) {
        console.log("loginError", error.message);
        res.status(500).json({
            message: "something went wrong",
            status: 500,
        });
    }
}
