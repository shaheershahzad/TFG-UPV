const express = require("express");
const router = express.Router();

const eventController = require("../controllers/event.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", eventController.getEvents);
    router.post("/", eventController.createEvent);
    router.get("/event-details/:id", eventController.getEvent);
    router.put("/:id", eventController.updateEvent);
    router.delete("/:id", eventController.deleteEvent);
//};
module.exports = router;