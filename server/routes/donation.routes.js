const express = require("express");
const router = express.Router();

const donationController = require("../controllers/donation.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", donationController.getDonations);
    router.get("/user-donations/:id", donationController.getUserDonations);
    router.post("/", donationController.createDonation);
    router.get("/donation-details/:id", donationController.getDonation);
    router.put("/:id", donationController.updateDonation);
    router.delete("/:id", donationController.deleteDonation);
//};
module.exports = router;