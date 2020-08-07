const newsModel = require("../models/news.model");
const newsController = {};

newsController.getAllNews = async (req, res) => {
    const allNews = await newsModel.find();
    res.json(allNews);
};

newsController.createNews = async (req, res) => {
    try {
        const news = new newsModel({
            name: req.body.name,
            description: req.body.description,
            link: req.body.link
        });
        let n = await news.save();
        res.json({
            "status":"News saved",
            "id": n._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

newsController.getNews = async (req, res) => {
    const news = await newsModel.findById(req.params.id);
    res.json(news);
};

newsController.updateNews = async (req, res) => {
    const news = {
        name: req.body.name,
        description: req.body.description,
        link: req.body.link
    }
    await newsModel.findByIdAndUpdate(req.params.id, {$set: news}, { new: true });
    res.json({
        "status":"News updated"
    });
};

newsController.deleteNews = async (req, res) => {
    await newsModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"News deleted"
    });
};

module.exports = newsController;