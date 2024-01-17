const express = require("express")
const app = express()
require("./database/khatabook.db")
require("./helper/reminderCrown")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.port || 5000

const { veryfyToken } = require("./middleware/verifyToken.middleware")


// routes
const userRouter = require("./routes/user.routes")
app.use("/user", userRouter)

const transectionRouter = require("./routes/transection.routes")
app.use("/transection", veryfyToken,transectionRouter)

const search = require("./routes/search.routes")
app.use("/search", veryfyToken, search)

const cashbookRouter = require("./routes/cashbook.routes")
app.use("/cashbook",veryfyToken, cashbookRouter);


app.listen(port, (err) => {
        if (err) {
            console.log("Error:Start Servers :", err);
        } else {
            console.log("Server Started At Port-:", port);
        }
})

