const express = require("express");
const router = express.Router();

const newsletterController = require("../controllers/newsletter.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", newsletterController.getSubscribers);
    router.post("/", newsletterController.addSubscriber);
    router.get("/:id", newsletterController.getSubscriber);
    router.put("/:id", newsletterController.updateSubscriber);
    router.delete("/:id", newsletterController.deleteSubscriber);
//};
module.exports = router;