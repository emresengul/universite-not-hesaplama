const express = require("express");
const router = express.Router();
const userController = require("../controllers/user")


router.get("/",userController.getIndex);
router.post("/hesapla",userController.sonuclariGetir)
router.get("/hesapla/:link",userController.sonuclariGoster)
router.post("/sifirla",userController.cacheSifirla)





module.exports = router;