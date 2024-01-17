const user = require("../model/user.model")
const transection = require("../model/transection.model")

exports.insertTransection = async (req, res) => {
    try {

        const data = await new transection({
            userId: req.data.id,
            name: req.body.name,
            emailId: req.body.emailId,
            contactNumber: req.body.contactNumber,
            details: req.body.details,
            amount: req.body.amount,
            date: req.body.date,
            typeOfUser: req.body.typeOfUser,
            typeOfTransection: req.body.typeOfTransection,
            transectionMethod: req.body.transectionMethod,

        })
        const savedData = await data.save()
        //loginTime Emailid will provided
        res.status(201).json({
            message: "Transection Inserted SuccessFully",
            status: 201,
            data: savedData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Transection Insert Error ${error.message}`,
            status: 500,
        });
    }
}
exports.updateTransection = async (req, res) => {
    try {
        const data = await transection.findByIdAndUpdate({ _id: req.params.id }, {
            $set: {
                name: req.body.name,
                emailId: req.body.emailId,
                contactNumber: req.body.contactNumber,
                details: req.body.details,
                amount: req.body.amount,
                date: req.body.date,
                typeOfUser: req.body.typeOfUser,
                typeOfTransection: req.body.typeOfTransection,
                transectionMethod: req.body.transectionMethod,
            }
        }, { new: true })

        res.status(200).json({
            message: "Transection Data Updated SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Data Update Error:- ${error.message}`,
            status: 500,
        });
    }
}

exports.deleteTransection = async (req, res) => {
    try {
        const data = await transection.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "Transection Deleted SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Data Delete Error:- ${error.message}`,
            status: 500,
        });
    }
}


exports.insertReminder = async (req, res) => {
    try {
        const data = await transection.findByIdAndUpdate({ _id: req.params.id }, { $set: { reminder: req.body.reminder } }, {
            new: true
        })
        res.status(201).json({
            message: "Transection Reminder Inserted SuccessFully",
            status: 201,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Reminder Insert Error ${error.message}`,
            status: 500,
        });
    }
}