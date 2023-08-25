const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');


// const getConnection = require('../lib/postgres');

//models es donde se van a guardar todos los modelos, o
//la forma en que podemos acceder a él.
/**
 * Configurado el modelo y vinculado con la conexión
 * de la base de datos representada por sequelize.
 * Esto implica que Sequelize creo la tabla en la base
 * de datos según la estructura definida en el Schema
 * y también establecio la conexión entre el modelo
 * en JavaScript y la tabla en la base de datos.
 */
const { models } = require('../lib/sequelize');
// const { User } = require('../db/models/user.model');


class UserService {
  constructor() {}


  async create(body) {
    const passHash = await bcrypt.hash(body.password, 10);

    //hago el clon de los datos para modificarlo.
    const newUser = await models.User.create({
      ...body,
      password: passHash,
    });
    delete newUser.dataValues.password;
    return newUser;
  };


    //Hay un manejador de
    // const newUser = await models.User.findOne({
    //   where: {email: body.email }
    // });
    // if(newUser){
    //   throw boom.conflict("Email already exist in data base");
    // } else {
    //   await User.create(body);
    //   return newUser;
    // };


  async find() {
    //Estamos trabajando con P.O.O, usando sequelize
    const rta = await models.User.findAll({
      include: ['customer'],
    });
    // const rta = await client.query('SELECT * FROM tasks');
    return rta;
  }

  async findByEmail(email) {
    //le indico a findOne, que
    //busque la fila que contenga el
    //email indicado, con el where
    const rta = await models.User.findOne({
      where: { email }
    });
    return rta;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if(!user){
      throw boom.notFound("user not found");
    }
    return user;
  }

  async update(id, changes) {

    const user = await this.findOne(id);
    const rta = await user.update(changes);
    return rta;

  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  };
}

module.exports = UserService;
