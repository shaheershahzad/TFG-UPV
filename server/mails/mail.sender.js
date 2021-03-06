require("dotenv").config();
const nodemailer = require("nodemailer");
const newsletterController = require("../controllers/newsletter.controller");
const mailController = {};

var broadcastEmail = newsletterController.getSubscribers;

//Mail test
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS
    }
});


mailController.sendWelcomeEmail = (mailtoName, mailtoEmail) => {
    let to = '"' + mailtoName + '" ' + '<' + mailtoEmail + '>';
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
    });

}

mailController.sendRecoveryEmail = (mailtoEmail, userId) => {
  let to = mailtoEmail;
  let emailMsg = '<h1>Hola!</h1>'+
                  '<p>Ha habido un intento de recuperación de contraseña para este correo electrónico. Si no has sido tu, ignora este mensaje.</p>'+
                  '<p>Si quieres resetear la contraseña, entra en el siguiente enlace: <a href="http://localhost:4200/recover-password/' +userId +'">Resetear mi contraseña</a></p>';

  var mailOptions = {
      from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
      to: to,
      subject: 'Password Recovery',
      html: emailMsg
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });

}

mailController.sendEventAddedEmail = (mailtoName, mailtoEmail) => {
  let to = '"' + mailtoName + '" ' + '<' + mailtoEmail + '>';
  let emailMsg = '<h1>Hola!</h1><p>Nuevo evento programado, acceda a nuestra página web para consultarlo!</p>';

  var mailOptions = {
      from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
      to: to,
      subject: '¡Noticia en la ONG!',
      html: emailMsg
  };

  transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
  });

}
  
mailController.sendNewsAddedEmail = (mailtoName, mailtoEmail) => {
    let to = '"' + mailtoName + '" ' + '<' + mailtoEmail + '>';
    let emailMsg = '<h1>Hola!</h1><p>Hay una nueva noticia disponible en nuestra ONG, acceda a nuestra página web para consultarla!</p>';

    var mailOptions = {
        from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
        to: to,
        subject: '¡Noticia en la ONG!',
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

}

mailController.sendBroadcastEmail = () => {
    let emailMsg = '<h1>Hola!</h1><p>Hay novedades en nuestra ONG, ve a nuestra página web y revísalas!</p>';

    var mailOptions = {
        from: `"ONG Vicente Berenger" <${process.env.EMAIL}>`,
        to: "",
        subject: '¡Novedades en la ONG!',
        html: emailMsg
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = mailController;