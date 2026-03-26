const express = require("express");
const router = express.Router();
const controller = require("../controllers/checkinController");

router.post("/create", controller.createCheckin);
router.get("/all", controller.getCheckins);

module.exports = router;