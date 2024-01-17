const transection = require("../model/transection.model")
const { mailSender } = require("./mail")
var cron = require('node-cron');


const reminderCrown = async () => {
    try {
        cron.schedule('0 0 0 * * *', async () => {
            const date = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
            console.log(date);
            const data = await transection.find({ reminder: new Date(date) });
            console.log(data.length);
            for (let i = 0; i < data.length; i++) {
                mailSender(data[i])
            }


        });
    } catch (error) {
        console.log("reminderCrown", error.message);
        res.status(500).json({
            message: "something went wrong",
            status: 500,
        });
    }
}
reminderCrown()