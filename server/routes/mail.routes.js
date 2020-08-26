const express = require("express");
const router = express.Router();

const mailController = require("../controllers/mail.controller");

//module.exports = router;

//module.exports = (router) => {
    router.post("/send-contact-form", mailController.sendContactMessage);
    router.post("/welcome-email", mailController.sendWelcomeEmail);
    router.post("/subscription-email", mailController.sendSubscriptionEmail);
    router.post("/send-project-created", mailController.sendProjectCreated);
    router.post("/send-event-created", mailController.sendEventCreated);
    router.post("/send-news-created", mailController.sendNewsCreated);
    router.post("/send-broadcast", mailController.sendBroadcast);
//};
module.exports = router;