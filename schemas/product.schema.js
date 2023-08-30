const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(40);
const price = Joi.number().integer().min(10);
const image = Joi.string();
const description = Joi.string().min(3).max(25);
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();
const priceMin = Joi.number().integer();
const priceMax = Joi.number().integer();



//POST
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});


//PATCH
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  categoryId: categoryId
});


//GET
const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit: limit,
  offset: offset,
  price: price,

  //Creo los datos query para filtrar precios especificos
  //Tambien le digo que si le envio un price max, debo
  //necesariamente pedir el precio minimo. Uso "when"
  priceMin: priceMin,
  priceMax: priceMax.when('priceMin',{
    is: Joi.number().integer(),
    then: Joi.required(),
  })
})


module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }
