const eventModel = require("../models/event.model");
const eventController = {};

eventController.getEvents = async (req, res) => {
    const events = await eventModel.find();
    res.json(events);
};

eventController.createEvent = async (req, res) => {
    try {
        const event = new eventModel({
            name: req.body.name,
            description: req.body.description,
            location: req.body.location,
            date: req.body.date,
            time: req.body.time
        });
        let eve = await event.save();
        res.json({
            "status":"Event saved",
            "id": eve._id
        });
    } catch (error) {
        console.log('err' + error);
        res.status(500).send(error);
    }
};

eventController.getEvent = async (req, res) => {
    const event = await eventModel.findById(req.params.id);
    res.json(event);
};

eventController.updateEvent = async (req, res) => {
    const event = {
        name: req.body.name,
        description: req.body.description,
        location: req.body.location,
        date: req.body.date,
        time: req.body.time
    }
    await eventModel.findByIdAndUpdate(req.params.id, {$set: event}, { new: true });
    res.json({
        "status":"Event updated"
    });
};

eventController.deleteEvent = async (req, res) => {
    await eventModel.findByIdAndRemove(req.params.id);
    res.json({
        "status":"Event deleted"
    });
};

module.exports = eventController;