const UserService = require('../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');




class AuthService {

  async getUser(email, password){
    const user = await service.findByEmail(email);
    if (!user) {
      //envio de errores
      throw boom.unauthorized();
    }
    //Comparacion, orden (password, hash)
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      //envio de errores
      throw boom.unauthorized();
    };
    //No entrega el password
    delete user.dataValues.password;
    return user;
  };

  singToken(user){
    const payload = {
      sub: user.id,
      role: user.role
    }
    const token = jwt.sign(payload, config.jwtSecret);
    return {
      user,
      token
    };
  };

  async sendMail(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.emailNodeMail,
        pass: config.passEmail
      }
    });

    await transporter.sendMail({
      from: 'kriquelme10@gmail.com',
      to: `${user.email}`,
      subject: "Este es un correo automatico",
      text: "A la grande le puse cuca",
      html: "<b>A la grande le puse cuca</b>",
    });
    return { message: 'Mail sent' };
  }

}

module.exports = { AuthService };
