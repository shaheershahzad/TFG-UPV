require("dotenv").config();
const nodemailer = require("nodemailer");
const mailController = {};

//Mail test
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});

mailController.sendContactMessage = async (req, res) => {

    const mailData = {
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    }
    
    let to = process.env.EMAIL;
    let emailMsg = mailData.message;

    var mailOptions = {
        from: `"Contact Form" <${process.env.EMAIL}>`,
        to: to,
        subject: "Formulario contacto: "+mailData.subject,
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          return res.send('Error saving');
        } else {
          console.log('Email sent: ' + info.response);
          res.send({
            "status":"Contact mail sent"
        });
        }
    });

};

mailController.sendWelcomeEmail = async (req, res) => {
    
    console.log(req);
    /*let to = '"' + mailtoName + '" ' + '<' + mailtoEmail + '>';
    let emailMsg = '<h1>Bienvenid@ ' + mailtoName + '</h1><p>Queremos darte las gracias por tu voluntad de ayudar junto con nuestra ONG!</p>';

    var mailOptions = {
        from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
        to: to,
        subject: '¡Bienvenid@!',
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });*/

};

mailController.sendProjectCreated = async (req, res) => {
    
};

mailController.sendEventCreated = async (req, res) => {
    
};

mailController.sendNewsCreated = async (req, res) => {
    
};

mailController.sendBroadcast = async (req, res) => {
    
};

module.exports = mailController;