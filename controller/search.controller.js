const user = require("../model/user.model")
const transection = require("../model/transection.model")
const cashbook = require("../model/cashbook.model")
exports.transectionGenerateReport = async (req, res) => {
    try {
        var totalGave = await transection.aggregate([{ $match: { userId: req.data.id, "typeOfTransection": "debit" } }, { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } }])
        var totalGot = await transection.aggregate([{ $match: { userId: req.data.id, "typeOfTransection": "credit" } }, { $group: { _id: null, total: { $sum: { $toDouble: "$amount" } } } }])
        if (totalGave.length == 0 && totalGot.length == 0) {
            totalGave = 0;
            var totalBalance = 0
        } else if (totalGave.length == 0) {
            totalGave = 0;
            var totalBalance = totalGot[0].total

        } else if (totalGot.length == 0) {
            totalGot = 0
            var totalBalance = 0 - totalGave[0].total
        } else {
            var totalBalance = totalGot[0].total - totalGave[0].total
        }

        const transectionData = await transection.find({ userId: req.data.id })
        var totalEntry = await transection.aggregate([{ $match: { userId: req.data.id } }, { $group: { _id: null, totalEntry: { $sum: 1 } } }])
        if (totalEntry.length == 0) {
            totalEntry = 0
        } else {
            totalEntry = totalEntry[0].totalEntry
        }
        const data = {
            allTransection: transectionData,
            totalGave: totalGave,
            totalGot: totalGot,
            totalBalance: totalBalance,
            totalEntry: totalEntry
        }
        res.status(200).json({
            message: "Transection Report Created SuccessFully",
            status: 200,
            data: data,
        });
    } catch (error) {
        res.status(500).json({
            message: `Transection Report Create Error:- ${error.message}`,
            status: 500,
        })
    }
}
// exports.transectionSortByNewest = async (req, res) => {
//     try {
//         const data = await transection.find({ userId: req.body.id }).sort({ _id: -1 }).limit(5)
//         res.status(200).json({
//             message: "sortByNewest SuccessFully",
//             status: 200,
//             data: data,
//         });
//     } catch (error) {
//         console.log("sortByNewest", error.message);
//         res.status(500).json({
//             message: "something went wrong",
//             status: 500,
//         })
//     }
// }
// exports.transectionSortByOldest = async (req, res) => {
//     try {
//         const data = await transection.find({ userId: req.body.id }).limit(5)
//         res.status(200).json({
//             message: "sortByOldest SuccessFully",
//             status: 200,
//             data: data,
//         });
//     } catch (error) {
//         console.log("sortByOldest", error.message);
//         res.status(500).json({
//             message: "something went wrong",
//             status: 500,
//         })
//     }
// }
// exports.transectionSortByHigestAmount = async (req, res) => {
//     try {
//         const data = await transection.find({ userId: req.body.id }).sort({ amount: -1 })
//         res.status(200).json({
//             message: "sortByHigestAmount SuccessFully",
//             status: 200,
//             data: data,
//         });
//     } catch (error) {
//         console.log("sortByHigestAmount", error.message);
//         res.status(500).json({
//             message: "something went wrong",
//             status: 500,
//         })
//     }
// }
// exports.transectionSortByLowestAmount = async (req, res) => {
//     try {
//         const data = await transection.find({ userId: req.body.id }).sort({ amount: 1 })
//         res.status(200).json({
//             message: "Get Data By Lowest Amount SuccessFully",
//             status: 200,
//             data: data,
//         });
//     } catch (error) {
//         console.log("sortByLowestAmount", error.message);
//         res.status(500).json({
//             message: "Something Went Wrong",
//             status: 500,
//         })
//     }
// }
// exports.transectionSortByName = async (req, res) => {
//     try {
//         const data = await transection.find({ userId: req.body.id }).sort({ name: 1 })
//         res.status(200).json({
//             message: "sortByName SuccessFully",
//             status: 200,
//             data: data,
//         });
//     } catch (error) {
//         console.log("sortByName", error.message);
//         res.status(500).json({
//             message: "something went wrong",
//             status: 500,
//         })
//     }
// }
exports.transectionFindCustomer = async (req, res) => {
    try {
        const data = await transection.find({ $and: [{ userId: req.data.id }, { name: req.body.name }] })

        res.status(200).json({
            message: "Transection Find By Name  SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Transection Find By Name Error-: ${error.message}`,
            status: 500,
        });
    }
}
exports.transectionFindByDateRange = async (req, res) => {
    try {

        const data = await transection.find({
            $and: [
                { userId: req.data.id },
                {
                    date: {
                        $gte: new Date(req.body.startDate),
                        $lt: new Date(req.body.endDate)
                    }
                }
            ]
        })
        res.status(200).json({
            message: "Transection Find By Date Range SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Transection Find By Date Range Error-: ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindByDateRange = async (req, res) => {
    try {

        const data = await cashbook.find({
            $and:
                [
                    { userId: req.data.id },
                    {
                        date: {
                            $gte: new Date(req.body.startDate),
                            $lt: new Date(req.body.endDate)
                        }
                    }
                ]

        })
        res.status(200).json({
            message: "Cashbook Find By Date Range SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `CashBook Find By Date Range Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindByCurrentMonth = async (req, res) => {
    try {

        const data = await cashbook.find(
            {
                $and:
                    [

                        { userId: req.data.id },
                        {
                            "$expr":
                            {
                                "$eq":
                                    [{ "$month": "$date" },
                                    new Date().getMonth() + 1]
                            }
                        }


                    ]

            }

        );

        res.status(200).json({
            message: "Cashbook Find By Current Month SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Cashbook Find By Current Month Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindByPriviousMonth = async (req, res) => {
    try {
        const data = await cashbook.find(
            {
                $and:
                    [

                        { userId: req.data.id },
                        {
                            "$expr":
                            {
                                "$eq":
                                    [{ "$month": "$date" },
                                    new Date().getMonth()]
                            }
                        }


                    ]

            }

        );
        res.status(200).json({
            message: "CashBook Find By Privious Month SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `CashBook Find By Privious Month Error:-  ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindByDate = async (req, res) => {
    try {

        const data = await cashbook.find({
            $and:
                [
                    {
                        userId: req.data.id
                    },
                    {
                        date: new Date(req.body.date)
                    }
                ]
        }

        )
        res.status(200).json({
            message: "CashBook Find By Date SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `CashBook Find By Date Error:-  ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindAllTransection = async (req, res) => {
    try {

        const data = await cashbook.find({ userId: req.data.id })
        res.status(200).json({
            message: "CashBook Find All Transection SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Cashbook Find All Transection Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindByWeek = async (req, res) => {
    try {

        const data = await cashbook.find({
            $and: [
                {
                    userId: req.data.id
                },
                {
                    date: {
                        $gte: new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)),
                        $lt: new Date()
                    }
                }
            ]
        })
        res.status(200).json({
            message: "CashBook Find By Week SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `CashBook Find By Week Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.userSortByLowestAmount = async (req, res) => {
    try {
        const data = await transection.aggregate([{ $match: { "userId": req.data.id } }, { $group: { _id: "$emailId", countAmount: { $sum: "$amount" } } }, { $sort: { "countAmount": 1 } }])
        res.status(200).json({
            message: "User Data Sort By Lowest Amount SuccessFully",
            status: 200,
            data: data,
        });
    } catch (error) {

        res.status(500).json({
            message: `User Data Sort By Lowest Amount Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.userSortByHigestAmount = async (req, res) => {
    try {
        const data = await transection.aggregate([{ $match: { "userId": req.data.id } }, { $group: { _id: "$emailId", countAmount: { $sum: "$amount" } } }, { $sort: { "countAmount": -1 } }])
        res.status(200).json({
            message: "User Data Sort By Higest Amount  Complete",
            status: 200,
            data: data,
        });
    } catch (error) {

        res.status(500).json({
            message: `User Data Sort By Higest Amount  Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.userSortByName = async (req, res) => {
    try {
        const data = await transection.aggregate([
            {
                $match: { "userId": req.data.id }
            },
            {

                $group: {
                    _id: { name: "$name" },
                    totalAmount: { $sum: "$amount" }


                }
            },
            {
                $sort: { "_id.name": 1 }
            }

        ])


        res.status(200).json({
            message: "User Data Sort By Name  Complete",
            status: 200,
            data: data,
        });
    } catch (error) {

        res.status(500).json({
            message: `User Data Sort By Name Error:- error.message`,
            status: 500,
        });
    }
}
exports.userSortByNewest = async (req, res) => {
    try {
        const data = await transection.aggregate([
            {
                $match: { "userId": req.data.id }
            },
            {
                $sort: {
                    _id: 1
                }
            },
            {
                $group: {
                    _id: "emailId",
                    documents: {
                        $push: "$$ROOT"
                    }
                }
            }
        ])


        res.status(200).json({
            message: "UserData Sort By Newest  Complete",
            status: 200,
            data: data,
        });
    } catch (error) {

        res.status(500).json({
            message: `UserData Sory By Newest Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.userSortByOldest = async (req, res) => {
    try {
        const data = await transection.aggregate([
            {
                $match: { "userId": req.data.id }
            },
            {
                $sort: {
                    _id: -1
                }
            },
            {
                $group: {
                    _id: "emailId",
                    documents: {
                        $push: "$$ROOT"
                    }
                }
            }
        ])


        res.status(200).json({
            message: "User  Sort By Oldest  SucessFully",
            status: 200,
            data: data,
        });
    } catch (error) {

        res.status(500).json({
            message: `User Sort By Oldest Error ${error.message}`,
            status: 500,
        });
    }
}
exports.transectionFindByCurrentMonth = async (req, res) => {
    try {

        const data = await transection.find(
            {
                $and: [
                    { userId: req.data.id },
                    {
                        "$expr":
                        {
                            "$eq":
                                [{ "$month": "$date" },
                                new Date().getMonth() + 1]
                        }
                    }
                ]
            }
        );

        res.status(200).json({
            message: "Transection Find By Current Month SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Find By Current Month Error  ${error.message}`,
            status: 500,
        });
    }
}
exports.transectionFindByPriviousMonth = async (req, res) => {
    try {

        const data = await transection.find(
            {
                $and: [
                    { userId: req.data.id },
                    {
                        "$expr":
                        {
                            "$eq":
                                [{ "$month": "$date" },
                                new Date().getMonth()]
                        }
                    }
                ]
            }
        );
        res.status(200).json({
            message: "Transection Find By Privious Month SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Find By Privious Month Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.transectionFindByDate = async (req, res) => {
    try {

        const data = await transection.find({
            $and: [
                { userId: req.data.id },
                { date: new Date(req.body.date) }
            ]
        }

        )
        res.status(200).json({
            message: "Transection Find By Date SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Find By Date Error:-  ${error.message}`,
            status: 500,
        });
    }
}
exports.transectionFindAllTransection = async (req, res) => {
    try {

        const data = await transection.find({ userId: req.data.id })
        res.status(200).json({
            message: "All Transection Find   SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `All Transection Find Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.transectionFindByWeek = async (req, res) => {
    try {

        const data = await transection.find({
            $and: [
                { userId: req.data.id },
                {
                    date: {
                        $gte: new Date(new Date().getTime() - (7 * 24 * 60 * 60 * 1000)),
                        $lt: new Date()
                    }
                }
            ]

        })
        res.status(200).json({
            message: "Transection Find By Week SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `Transection Find By Week Error:- ${error.message}`,
            status: 500,
        });
    }
}
exports.cashbookFindDetails = async (req, res) => {
    try {
        const data = await cashbook.find(
            {
                $and:
                    [
                        {
                            userId: req.data.id
                        },
                        {
                            details: req.body.name
                        }
                    ]
            })
        res.status(200).json({
            message: "CashBook Data Find By Name SuccessFully",
            status: 200,
            data: data,
        });
    }
    catch (error) {

        res.status(500).json({
            message: `CashBook Data Find By Name Error  ${error.message}`,
            status: 500,
        });
    }
}