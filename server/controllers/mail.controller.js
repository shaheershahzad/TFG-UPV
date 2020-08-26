require("dotenv").config();
const nodemailer = require("nodemailer");
const { subscribe } = require("../routes/mail.routes");
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
            res.json({
                "status":"Contact mail sent"
            });
        }
    });

};

mailController.sendWelcomeEmail = async (req, res) => {
    
    //console.log(req);

    const mailData = {
        name: req.body.name,
        email: req.body.to
    }

    let to = '"' + mailData.name + '" ' + '<' + mailData.email + '>';
    let emailMsg = '<h1>Bienvenid@ ' + mailData.name + '</h1><p>Queremos darte las gracias por tu voluntad de ayudar junto con nuestra ONG!</p>';

    var mailOptions = {
        from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
        to: to,
        subject: '¡Bienvenid@!',
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.send('Error saving');
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                "status":"Welcome mail sent"
            });
        }
    });

    res.json({
        "status":"Welcome mail sent"
    });
};

mailController.sendSubscriptionEmail = async (req, res) => {
    
    //console.log(req);

    const mailData = {
        name: req.body.name,
        email: req.body.to
    }

    let to = '"' + mailData.name + '" ' + '<' + mailData.email + '>';
    let emailMsg = '<h1>Hola ' + mailData.name + '</h1><p>Has sido dado de alta en nuestro boletín de noticias. Recibirás todas las novedades de la ONG.</p>';

    var mailOptions = {
        from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
        to: to,
        subject: 'Suscripción al boletín | ONG',
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.send('Error sending subscription mail');
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                "status":"Subscription mail sent"
            });
        }
    });

    res.json({
        "status":"Subscription mail sent"
    });

};

mailController.sendProjectCreated = async (req, res) => {
    
};

mailController.sendEventCreated = async (req, res) => {
    
};

mailController.sendNewsCreated = async (req, res) => {
    
};

mailController.sendBroadcast = async (req, res) => {

    //console.log(req);

    const mailData = {
        subject: req.body.subject,
        subscribers: req.body.subscribers
    }

    //console.log("######################################################");
    //console.log(mailData);

    let receivers = process.env.EMAIL;

    mailData.subscribers.forEach(subscriber => {
        receivers += ","+subscriber.email;
    });

    //console.log(receivers);

    //let to = '"' + mailData.name + '" ' + '<' + mailData.email + '>';
    let emailMsg = '<h1>Hola!</h1><p>Hay un evento nuevo disponible en nuestra página web. Entre en el siguiente enlace para ver los eventos programados: http://localhost:4200/events</p>';

    var mailOptions = {
        from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
        to: receivers,
        subject: mailData.subject,
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            return res.send('Error sending broadcast mail');
        } else {
            console.log('Email sent: ' + info.response);
            res.json({
                "status":"Broadcast mail sent"
            });
        }
    });

    res.json({
        "status":"Broadcast mail sent"
    });
    
};

module.exports = mailController;