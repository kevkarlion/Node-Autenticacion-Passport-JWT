//Este archivo definirá el modelo de la tabla de usuarios,
//y su configuracion con la db
//Creo el esquema

const { Model, DataTypes, Sequelize } = require('sequelize');

const { USER_TABLE } = require('./user.model');


//-- Nombre de nuestra tabla
const CUSTOMER_TABLE = 'customers';

//-- Esquema que define la estructura de la db
const CustomerSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastName: {
    allowNull: false,
    type: DataTypes.STRING,
    field: 'last_name'
  },
  phone: {
    allowNull: true,
    type: DataTypes.STRING,
    defaultValue: 'customer'
  },
  //Es un campo que contiene informacion sobre
  //la fecha en que se creo el campo
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW
  },



  //Configuracion para la foreignKey enlazada a primaryKey de la tabla, User
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,


    //Le indicamos a que tabla va relacionada con "references"
    /**onUpdate: Esta opción especifica qué acción se realizará en la tabla secundaria (la tabla que tiene la clave foránea) cuando se actualiza el valor de la clave primaria en la tabla principal (la tabla a la que se hace referencia). En este caso, se establece como 'CASCADE', lo que significa que cuando se actualiza el valor de la clave primaria en la tabla principal, todas las filas relacionadas en la tabla secundaria también se actualizarán en consecuencia. Por ejemplo, si cambias el ID de un usuario en la tabla principal, todas las filas que tienen el mismo ID de usuario en la tabla secundaria también se actualizarán con el nuevo valor. */
    /**onDelete: Esta opción especifica qué acción se realizará en la tabla secundaria cuando se elimina una fila de la tabla principal. En este caso, se establece como 'SET NULL', lo que significa que cuando se elimina una fila de la tabla principal, el valor de la clave foránea en la tabla secundaria se establecerá en NULL. Por ejemplo, si eliminas un usuario de la tabla principal, la columna "userId" en la tabla secundaria se establecerá en NULL para todas las filas que tenían la relación con ese usuario eliminado.
 */

    /**Al hacer la modificacion de que userId sea unico, no debemos enviar la parte de "references",
     * ya que esta creada previamente en migrationes previas.
     */
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },



};


//-- Definimos una clase con nuestro Modelo
// IMPORTANTE! El Model tiene todas las formas en que vamos a hacer querys
class Customer extends Model {

  //recibo la asociacion de modelos
  //y luego especifico models.User, la tabla que quiero
  //vincular con Customer
  static associate(models) {
    this.belongsTo(models.User, { as: 'user' });
    this.hasMany(models.Order,{
      as: 'order',
      foreignKey: 'customerId'
    });
  }

  static config(sequelize) {
    return {
      // Es la instancia de Sequelize que se utilizará para conectar
      // y realizar operaciones con la base de datos
      sequelize,
      tableName: CUSTOMER_TABLE,

      //modelName es el nombre con el que va a guardar el modelo,
      //luego cuando lo invoquemos, será con este nombre
      modelName: 'Customer',

      //Sequelize no agregará automáticamente dos campos adicionales llamados createdAt y updatedAt en la tabla de la base de datos.
      timestamps: false,
    };
  };
};

module.exports = { CUSTOMER_TABLE, CustomerSchema, Customer };


/**
 * En el método `config` de la clase `User`, los datos que son necesarios y que deben ser proporcionados para su correcto funcionamiento son los siguientes:

1. `sequelize`: Es la instancia de Sequelize que se utilizará para conectar y realizar operaciones con la base de datos. Sin esta instancia, el modelo `User` no podrá interactuar con la base de datos.

2. `tableName`: Es el nombre de la tabla en la base de datos donde se almacenarán los registros del modelo `User`. Este parámetro es esencial para que Sequelize sepa en qué tabla debe realizar las consultas y operaciones relacionadas con este modelo.

3. `modelName`: Es el nombre con el que se guardará el modelo `User` en Sequelize. Aunque es opcional, proporcionar un nombre aquí permitirá referirse al modelo utilizando ese nombre en lugar del nombre de la clase (`User`). Es útil cuando se realiza una consulta o una operación con el modelo.

4. `timestamps`: Es un booleano que indica si Sequelize debe agregar automáticamente las marcas de tiempo `createdAt` y `updatedAt` a cada registro del modelo. Estas marcas de tiempo se utilizan para rastrear cuándo se creó y modificó por última vez un registro. Si `timestamps` es `false`, Sequelize no agregará automáticamente estas marcas de tiempo.

En resumen, `sequelize`, `tableName` y `timestamps` son los datos necesarios que se deben proporcionar en el objeto de configuración del modelo `User`. El parámetro `modelName` es opcional y se utiliza principalmente para tener un nombre personalizado para el modelo en Sequelize.
 */
