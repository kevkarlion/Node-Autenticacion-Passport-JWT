//Este archivo definirá el modelo de la tabla de usuarios
//Creo el esquema

const { Model, DataTypes, Sequelize } = require('sequelize');
// const sequelize = require('../../lib/sequelize');


//-- Nombre de nuestra tabla
const USER_TABLE = 'users';

//-- Esquema que define la estructura de la db
const UserSchema = {
  // Definimos la estructura de la tabla
  //Atributos

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING
  },
  recoveryToken: {
    allowNull: true,
    type: DataTypes.STRING,
    field: 'recovery_token'
  },
  role: {
    allowNull: false,
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
};


//-- Definimos una clase con nuestro Modelo
// IMPORTANTE! El Model tiene todas las formas en que vamos a hacer querys
class User extends Model {
  static associate(models){
    //Le indico la asociacion que hay del lado del customer.
    //desde la tabla customers hay una relacion userId y ahi se puede
    //resolver mutuamente la relacion
    this.hasOne(models.Customer, {
      as:'customer',
      foreignKey: 'userId'
    });
  }

  static config(sequelize){
    return {
      // Es la instancia de Sequelize que se utilizará para conectar
      // y realizar operaciones con la base de datos
      sequelize,
      tableName: USER_TABLE,

      //modelName es el nombre con el que va a guardar el modelo,
      //luego cuando lo invoquemos, será con este nombre
      modelName: 'User',

      //Sequelize no agregará automáticamente dos campos adicionales llamados createdAt y updatedAt en la tabla de la base de datos.
      timestamps: false,
    };
  };
};

module.exports = { USER_TABLE, UserSchema, User };


/**
 * En el método `config` de la clase `User`, los datos que son necesarios y que deben ser proporcionados para su correcto funcionamiento son los siguientes:

1. `sequelize`: Es la instancia de Sequelize que se utilizará para conectar y realizar operaciones con la base de datos. Sin esta instancia, el modelo `User` no podrá interactuar con la base de datos.

2. `tableName`: Es el nombre de la tabla en la base de datos donde se almacenarán los registros del modelo `User`. Este parámetro es esencial para que Sequelize sepa en qué tabla debe realizar las consultas y operaciones relacionadas con este modelo.

3. `modelName`: Es el nombre con el que se guardará el modelo `User` en Sequelize. Aunque es opcional, proporcionar un nombre aquí permitirá referirse al modelo utilizando ese nombre en lugar del nombre de la clase (`User`). Es útil cuando se realiza una consulta o una operación con el modelo.

4. `timestamps`: Es un booleano que indica si Sequelize debe agregar automáticamente las marcas de tiempo `createdAt` y `updatedAt` a cada registro del modelo. Estas marcas de tiempo se utilizan para rastrear cuándo se creó y modificó por última vez un registro. Si `timestamps` es `false`, Sequelize no agregará automáticamente estas marcas de tiempo.

En resumen, `sequelize`, `tableName` y `timestamps` son los datos necesarios que se deben proporcionar en el objeto de configuración del modelo `User`. El parámetro `modelName` es opcional y se utiliza principalmente para tener un nombre personalizado para el modelo en Sequelize.
 */
