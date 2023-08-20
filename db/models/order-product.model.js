const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_PRODUCT_TABLE = 'orders_products';

const { ORDER_TABLE } = require('./order.model');
const { PRODUCT_TABLE } = require('./product.model');




const OrderProductSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  orderId: {
    field: 'order_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    // unique: true,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  productId: {
    field: 'product_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    // unique: true,
    references: {
      model: PRODUCT_TABLE,
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

};

class OrderProduct extends Model {
  static associate() {
    // this.belongsTo(model.Customer, { as: 'customer' });
  }
  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,

      //modelName es el nombre con el que va a guardar el modelo,
      //luego cuando lo invoquemos, será con este nombre
      modelName: 'OrderProduct',

      //Marcas de tiempo automaticas.
      timestamps: false
    }
  }
}

module.exports = { OrderProductSchema, OrderProduct, ORDER_PRODUCT_TABLE };
