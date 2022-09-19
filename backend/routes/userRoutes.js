/* Import des modules necessaires */
const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userController");
const multer = require("../middleware/GuardMulterUser");
const auth = require("../middleware/GuardAuth");

/* Routage User */
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.patch("/modify/:userId", auth, multer, userCtrl.modifyUser);
router.get("/", userCtrl.getAllUser);
router.get("/:userId", auth, userCtrl.getOneUser);


module.exports = router;
