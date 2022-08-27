/* Import des modules necessaires */
const express = require("express");
const router = express.Router();
const refreshCtrl = require("../controllers/refreshTokenController");


/* Routage User */
router.get("/token", refreshCtrl.refreshToken);



module.exports = router;
