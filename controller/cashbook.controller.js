const cashbook = require("../model/cashbook.model")

exports.insertCashbook = async (req, res) => {
    try {
        const data = await new cashbook({
            userId: req.data.id,
            details: req.body.details,
            amount: req.body.amount,
            date: req.body.date,
            typeOfTransection: req.body.typeOfTransection,
            transectionMethod: req.body.transectionMethod,
        })
        const savedData = await data.save()

        res.status(201).json({
            message: "Insert Cashbook Data SuccessFully",
            status: 201,
            data: savedData,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Cashbook Data Insert Error-: ${error.message}`,
            status: 500,
        });
    }
}
exports.updateCashbook = async (req, res) => {
    try {
        const data = await cashbook.findByIdAndUpdate({ _id: req.params.id }, {
            $set:
            {
                userId: req.body.userId,
                details: req.body.details,
                amount: req.body.amount,
                date: req.body.date,
                typeOfTransection: req.body.typeOfTransection,
                transectionMethod: req.body.transectionMethod,
            }
        }, { new: true })

        res.status(200).json({
            message: "Update In CashBook Data SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `CashBook Update Data Error:-  ${error.message}`,
            status: 500,
        });
    }
}
exports.deleteCashbook = async (req, res) => {
    try {
        const data = await cashbook.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({
            message: "CashBook Data Delete SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `CashBook Data Delete SuccessFully  ${error.message}`,
            status: 500,
        });
    }
}

exports.searchCashbook = async (req, res) => {
    try {
        const data = await cashbook.findById({ _id: req.body.id })


        res.status(200).json({
            message: "CashBook Data Search  SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `CashBook Data Search Error:- ${error.message}`,
            status: 500,
        });
    }
}