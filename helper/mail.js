var nodemailer = require('nodemailer');
const { convert } = require("html-to-text")

exports.mailSender = async (reminderInfo) => {
    var data = convert(`<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h1>Subject : Your payment is due </h1>
    <br>
            <h2> Hi ${reminderInfo.name},</h2>
    <br>
    <br>

            <h3>This is just a reminder that payment on
              ${reminderInfo.amount}</h3>
              <h3> which we sent on ${reminderInfo.date}, is due today.</h3>
           
    <br>
    <br>
            <h5>Thank You,</h5>

        </body>
    </html>`)

    var subject = "Your payment is due"

    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });

    var mailOptions = {
        from: process.env.EMAIL,
        to: reminderInfo.emailId,
        subject: subject,
        text: data
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}