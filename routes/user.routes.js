const router = require("express").Router()
const { veryfyToken } = require("../middleware/verifyToken.middleware")

const {
    insertUser,
    updateUser,
    deleteUser,
    loginUser
} = require('../controller/user.controller');
const { token } = require("morgan");
const { verify } = require("jsonwebtoken");

router.post("/insert", insertUser)
router.put("/update/", veryfyToken, updateUser)
router.delete("/delete", veryfyToken, deleteUser)
router.get("/login", veryfyToken, loginUser)
module.exports = router                                                                   