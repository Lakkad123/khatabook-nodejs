const router = require("express").Router()
const {
    insertTransection,
    updateTransection,
    deleteTransection,
    insertReminder
} = require("../controller/transection.controller")


router.post("/insert", insertTransection)
router.put("/update/:id", updateTransection)
router.delete("/delete/:id", deleteTransection)
router.post("/insertReminder/:id", insertReminder)


module.exports = router