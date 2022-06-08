const express = require("express");
const router = express.Router();

const regionHandler = require("./handler/regions");

router.get("/", regionHandler.getRegion);
router.post("/", regionHandler.create);

module.exports = router;
