const express = require("express");
const router = express.Router();

const newsController = require("../controllers/news.controller");

//module.exports = router;

//module.exports = (router) => {
    router.get("/", newsController.getAllNews);
    router.post("/", newsController.createNews);
    router.get("/news-details/:id", newsController.getNews);
    router.put("/:id", newsController.updateNews);
    router.delete("/:id", newsController.deleteNews);
//};
module.exports = router;