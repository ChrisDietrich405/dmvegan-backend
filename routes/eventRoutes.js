const express = require("express");
const router = express.Router();
const eventControllers = require("../controllers/eventControllers");

router.get("/add-event", eventControllers.addEvent);

module.exports = router;
