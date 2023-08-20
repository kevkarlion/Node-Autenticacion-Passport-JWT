const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');



const { models } = require('../lib/sequelize');
// const { Customer } = require('../db/models/customer.model');


class CustomerService {
  constructor() { }


  async create(data) {
    /**
     * Clono el objeto y luego modifico el password hasheado.
     * luego le envio el clon a la nueva fila de la bd
     */
    const passHash = await bcrypt.hash(data.user.password, 10);
    const cloneCustomer = {
      ...data,
      user: {
        ...data.user,
        password: passHash
      },
    };
    const newCustomer = await models.Customer.create(cloneCustomer, {
      include: ['user'],
    });

    /**
     * Elimino el password en la devolucion de datos
     */
    delete newCustomer.user.dataValues.password;
    return newCustomer;
  };


  async find() {
    const rta = await models.Customer.findAll({
      /**Puedo incluir en la busqueda
       * ya que esta configurado "this.belongsTo(models.User, {as: 'user'});"
       */
      include: ['user'],
    });
    return rta;
  }

  async findOne(id) {
    const customerFind = await models.Customer.findByPk(id);
    if (!user) {
      throw boom.notFound("Customer not found");
    }
    return customerFind;
  }

  async update(id, changes) {

    const customerFind = await this.findOne(id);
    const rta = await customerFind.update(changes);
    return rta;

  }

  async delete(id) {
    const customerFind = await this.findOne(id);
    await customerFind.destroy();
    return id;
  };
}

module.exports = CustomerService;
