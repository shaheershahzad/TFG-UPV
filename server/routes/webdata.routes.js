const express = require("express");
const router = express.Router();

const webdataController = require("../controllers/webdata.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", webdataController.getWebdata);
    router.post("/", webdataController.addWebdata);
    router.put("/:id", webdataController.updateWebdata);
//};
module.exports = router;