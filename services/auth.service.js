const UserService = require('../services/user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');




class AuthService {

  /**
   * Obtener datos de usuario a traves de un token
   */
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

  //Firma de token - crear token
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

  async sendRecovery(email){
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    //creo un payload
    const payload = {
      sub: user.id,
    };

    //creo token con payload y el secret
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min'});

    /**
     *creo un link al cual el usuario debera ingresar
      para poder reestablecer el password.
     */
    const link = `https://myfrontend.com/recovery?token=${token}`;

    /**
     * Envio los datos a la db de usario
      actualizo los datos cargando el token a la
      columna recoveryToken
     */
    await service.update(user.id, { recoveryToken: token });


    /**
     * Cargo la parte de la info de
     * destinatario del mail
     */
    const mail = {
      from: 'kriquelme10@gmail.com',
      to: `${user.email}`,
      subject: "Email de recuperacion de password",
      text: "A la grande le puse cuca",
      html: `<b>Ingresa a este link =>${link}</b>`,
    };

    //envio la info al metodo
    const rta = this.sendMail(mail);
    return rta;
  };

  async sendMail(infoMail){
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: config.emailNodeMail,
        pass: config.passEmail
      }
    });

    //desacoplo para reutilizar.
    // await transporter.sendMail({
    //   from: 'kriquelme10@gmail.com',
    //   to: `${user.email}`,
    //   subject: "Este es un correo automatico",
    //   text: "A la grande le puse cuca",
    //   html: "<b>A la grande le puse cuca</b>",
    // });
    await transporter.sendMail(infoMail);
    return { message: 'Mail sent' };
  }


  async changePassword({ token, newPassword }){
    try {
      console.log("Token recibido:", token);
      console.log("NewPassword recibido:", newPassword);
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      console.log("Token de verificacion:" );
      if( user.recoveryToken !== token ){
        throw boom.unauthorized();
      };
      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, { recoveryToken: null, password: hash });
      return { message: 'Password changed'};
    } catch (error) {
      throw boom.unauthorized();
    }
  }

}

module.exports = { AuthService };
