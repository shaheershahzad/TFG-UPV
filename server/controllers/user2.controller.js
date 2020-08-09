const user2Model = require("../models/user2.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123456";
const user2Controller = {};

user2Controller.getUsers = async (req, res) => {
    const users = await user2Model.find();
    res.json(users);
};

user2Controller.createUser = async (req, res) => {
    const user = new user2Model({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
        birthday: req.body.birthday,
        newsletter: req.body.newsletter
    });
    await user.save();
    res.json({
        "status":"User saved"
    });
};

user2Controller.getUser = async (req, res) => {
    const user = await user2Model.findById(req.params.id);
    res.json(user);
};

user2Controller.updateUser = async (req, res) => {
    const user = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        birthday: req.body.birthday,
        newsletter: req.body.newsletter
    }
    await user2Model.findByIdAndUpdate(req.params.id, {$set: user}, { new: true});
    res.json({
        "status":"User updated"
    });
};

user2Controller.resetPassword = (req, res, next) => {
    const newData = {
        email: req.query.recoveryEmail,
        password: req.query.newPassword
    }

    userDAO.findOneAndUpdate({ email: newData.email }, { password: bcrypt.hashSync(newData.password) }, (err, user) => {
        if(err){
            return res.status(500).send("Server error");
        }

        if(!user){
            // Email doesn't exist
            res.status(409).send("Something is wrong");
        }else{
            res.send({
                "status":"Password updated"
             });
        }
    });
}

user2Controller.deleteUser = async (req, res) => {
    await user2Model.findByIdAndRemove(req.params.id);
    res.json({
        "status":"User deleted"
    });
};

module.exports = user2Controller;