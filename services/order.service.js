const boom = require('@hapi/boom');

const { models } = require('./../lib/sequelize')

class OrderService {

  constructor(){
  }

  async create(body) {
    const newOrder = await models.Order.create(body)
    return newOrder;
  }

  async addItem(body) {
    //Estoy creando una nuevo elemento en la base de datos,
    //peero, estoy creando desde order, un nvo. elemento en OrderProduct.
    //Es por ello que cuando que cree un metodo en Order que se llama "addItemSchema",
    //donde le requiero al ususario datos como el productId y orderId, ya que no se crea
    //en esta tabla de Order, sino en OrderProduct
    const newItem = await models.OrderProduct.create(body)
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    /**
     * El código busca y recupera una orden de la base de datos por su ID y también carga la información del cliente relacionado utilizando la opción include. Esto permite acceder tanto a los detalles de la orden como a la información del cliente en un solo objeto.
     */
    const order = await models.Order.findByPk(id, {
      /**
       * realizo un anidamiento en los datos a solicitar
       */
      include: [{
        association: 'customer',
        include: ['user'],
        },
        //Incluyo la asociacion de belongsToMany
        'items',
      ],
    });
    return order;
  };

  //Consultas complejas
  async findByUser(userId){
    const orders = await models.Order.findAll({
      //Hacemos una consulta por asociaciones
      //que tiene una orden
      /**
       * where: { '$customer.user.id$': userId },
          El objeto where especifica los criterios de búsqueda para la consulta. En este caso, parece que estás buscando órdenes cuyo cliente tenga un usuario con el ID igual al valor de userId.
       */
      where: {
        '$customer.user.id$': userId,
      },
      /**
       * include: [ { association: 'customer', include: ['user'], }, ],
        La propiedad include permite incluir asociaciones y sus propias asociaciones secundarias en la consulta. Aquí, estás incluyendo la asociación llamada 'customer' y también incluyes la asociación secundaria 'user' dentro de la asociación 'customer'. Esto significa que también obtendrás información sobre el cliente y el usuario asociado a cada pedido.
       */
      include: [
        {
        association: 'customer',
        include: ['user'],
        },
      ],
    });
    return orders;
  };

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = OrderService;
