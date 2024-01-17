const router = require("express").Router()
const {
    insertCashbook,
    updateCashbook,
    deleteCashbook,
    searchCashbook
} = require("../controller/cashbook.controller")
router.post("/insert", insertCashbook)
router.put("/update/:id", updateCashbook)
router.delete("/delete/:id", deleteCashbook)
router.get("/search", searchCashbook)


module.exports = router
