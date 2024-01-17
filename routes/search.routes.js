const router = require("express").Router()
const {
    transectionGenerateReport,
    transectionFindCustomer,
    transectionFindByDateRange,
    cashbookFindByDate,
    cashbookFindByDateRange,
    cashbookFindByCurrentMonth,
    cashbookFindAllTransection,
    cashbookFindByWeek,
    cashbookFindByPriviousMonth,
    userSortByLowestAmount,
    userSortByHigestAmount,
    userSortByNewest,
    userSortByOldest,
    userSortByName,
    transectionFindByCurrentMonth,
    transectionFindByDate,
    transectionFindAllTransection,
    transectionFindByWeek,
    transectionFindByPriviousMonth,
    cashbookFindCustomer,
    cashbookFindDetails

} = require("../controller/search.controller")
router.get("/transectionFindByCurrentMonth", transectionFindByCurrentMonth)
router.get("/transectionFindByPriviousMonth", transectionFindByPriviousMonth)
router.get("/transectionFindByDate", transectionFindByDate)
router.get("/transectionFindAllTransection", transectionFindAllTransection)
router.get("/transectionFindByWeek", transectionFindByWeek)
router.get("/transectionreport", transectionGenerateReport)
router.get("/transectionFindCustomer", transectionFindCustomer)
router.get("/transectionfindByDateRange", transectionFindByDateRange)
router.get("/cashbookfindByDateRange", cashbookFindByDateRange)
router.get("/cashbookfindByCurrentMonth", cashbookFindByCurrentMonth)
router.get("/cashbookfindByPriviousMonth", cashbookFindByPriviousMonth)
router.get("/cashbookfindByDate", cashbookFindByDate)
router.get("/cashbookfindAllTransection", cashbookFindAllTransection)
router.get("/cashbookFindByWeek", cashbookFindByWeek)
router.get("/cashbookFindDetails", cashbookFindDetails)
router.get("/userSortByLowestAmount", userSortByLowestAmount)
router.get("/userSortByHigestAmount", userSortByHigestAmount)
router.get("/userSortByNewest", userSortByNewest)
router.get("/userSortByOldest", userSortByOldest)
router.get("/userSortByName", userSortByName)
module.exports = router