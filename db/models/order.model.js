const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';

const { CUSTOMER_TABLE } = require('./customer.model')

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    // unique: true,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },
  total: {
    type: DataTypes.VIRTUAL,
    get(){
      if(this.items.length > 0 ){
        return this.items.reduce((total, item ) => {
          return total + (item.price * item.OrderProduct.amount)
        }, 0);
      }
      return 0;
    }
  },
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, { as: 'customer' });

    //Le indico cual es la tabla con la que tiene una relacion muchos a muchos.
    //Pero, esta asociacion se resuelve por medio de su tabla ternaria, es por eso
    //que una vez que le indico el models.Products, despues le paso los datos
    //en detalle de quien es la tabla ternaria que hace esta asosciacion.
    /**
     * En resumen, estas líneas de código establecen las relaciones entre el modelo Order y los modelos Customer y Product utilizando las asociaciones "pertenece a" y "muchos a muchos". La asociación muchos a muchos se resuelve a través de una tabla ternaria (OrderProduct), que permite relacionar órdenes con productos de manera eficiente.
     */
    this.belongsToMany(models.Product, {
      as: 'items',
      through: models.OrderProduct,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,

      //modelName es el nombre con el que va a guardar el modelo,
      //luego cuando lo invoquemos, será con este nombre
      modelName: 'Order',

      //Marcas de tiempo automaticas.
      timestamps: false
    }
  }
}

module.exports = { OrderSchema, Order, ORDER_TABLE };
