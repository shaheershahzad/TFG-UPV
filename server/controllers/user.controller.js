require("dotenv").config();
const mailer = require("../mails/mail.sender");
const userDAO = require("../DAO/user.dao");
const user2Controller = require("../controllers/user2.controller");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const SECRET_KEY = "secretkey123456";

exports.createUser = (req, res, next) => {
    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
        birthday: req.body.birthday,
        newsletter: req.body.newsletter
    }

    userDAO.create(newUser, (err, user) => {
        
        if(err && err.code == 11000){
            return res.status(409).send("Email already exists");
        }
        
        if(err){
            return res.status(500).send("Server error");
        }

        const expiresIn = 24*60*60;
        const accessToken = jwt.sign({ id: user.id },
        SECRET_KEY, {
            expiresIn: expiresIn
        });

        const dataUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            accessToken: accessToken,
            expiresIn: expiresIn,
            role: user.role
        }

        //Send welcome email
        //mailer.sendWelcomeEmail(dataUser.name, dataUser.email);

        //response
        res.send({ dataUser });
    });
}

exports.loginUser = (req, res, next) => {
    const userData = {
        email: req.body.email,
        password: req.body.password
    }

    userDAO.findOne({ email: userData.email }, (err, user) => {
        if(err){
            return res.status(500).send("Server error");
        }

        if(!user){
            // Email doesn't exist
            res.status(409).send("Something is wrong");
        }else{
            const resultPassword = bcrypt.compareSync(userData.password, user.password);
            if(resultPassword){
                const expiresIn = 24*60*60;
                accessToken = jwt.sign({id: user.id}, SECRET_KEY, {expiresIn: expiresIn});

                const dataUser = {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    accessToken: accessToken,
                    expiresIn: expiresIn,
                    role: user.role
                }

                res.send({ dataUser });
            }else{
                // Wrong password
                res.status(409).send("Something is wrong");
            }
        }
    });
}

exports.sendResetEmail = (req, res, next) => {
    const recoveryEmail = {
        email: req.query.recoveryEmail
    }

    userDAO.findOne({ email: recoveryEmail.email }, (err, user) => {
        if(err){
            return res.status(500).send("Server error");
        }

        if(!user){
            // Email doesn't exist
            res.status(409).send("Something is wrong");
        }else{

            //Send recovery email
            mailer.sendRecoveryEmail(user.email, user.id);
        }
    });
}

exports.resetPassword = (req, res, next) => {
    const newData = {
        email: req.query.recoveryEmail,
        password: bcrypt.hashSync(req.query.newPassword)
    }

    //console.log(newData);

    userDAO.findOneAndUpdate({ email: newData.email }, { password: newData.password }, (err, user) => {
        if(err){
            return res.status(500).send("Server error");
        }

        if(!user){
            // Email doesn't exist
            res.status(409).send("Something is wrong");
        }else{

            user2Controller.resetPassword(newData.email, newData.password).then( () => {
                res.send({
                    "status":"Password updated"
                });
            });
        }
    });
}

exports.saveUser = (req, res, next) => {

    const newUser = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
        role: req.body.role,
        birthday: req.body.birthday,
        newsletter: req.body.newsletter
    }

    userDAO.create(newUser, (err, user) => {
        
        if(err && err.code == 11000){
            return res.status(409).send("Email already exists");
        }
        
        if(err){
            return res.status(500).send("Server error");
        }

        //response
        res.send({
            "status":"User registered"
        });
    });

}

exports.getUser = (req, res, next) => {
    const newData = {
        id: req.query.userId
    }

    userDAO.findById(newData.id , (err, user) => {
        if(err){
            return res.status(500).send("Server error");
        }

        if(!user){
            // Id doesn't exist
            res.status(409).send("Something is wrong");
        }else{

            res.send(user);
        }
    });
}