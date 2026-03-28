const express = require("express");
const router = express.Router();
const controller = require("../controllers/checkinController");
const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.single("pic"), controller.createCheckin);
router.get("/all", controller.getCheckins);

module.exports = router;
