
const nodemailer = require("nodemailer");

//Servidor que usamos para el envio de correos
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    //user y pass van como variables de entorno. Configurar despues
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: 'kriquelme10@gmail.com',
    pass: 'xiwlcziswclmypdl'
  }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: 'kriquelme10@gmail.com', // sender address
    to: "kriquelme10@gmail.com", // list of receivers
    subject: "Este es un correo automatico", // Subject line
    text: "A la grande le puse cuca", // plain text body
    html: "<b>A la grande le puse cuca</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  //
  // NOTE: You can go to https://forwardemail.net/my-account/emails to see your email delivery status and preview
  //       Or you can use the "preview-email" npm package to preview emails locally in browsers and iOS Simulator
  //       <https://github.com/forwardemail/preview-email>
  //
}

main().catch(console.error);
