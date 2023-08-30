const express = require('express');

const CategoryService = require('./../services/category.service');
const validatorHandler = require('./../middlewares/validator.handler');
const { createCategorySchema, updateCategorySchema, getCategorySchema } = require('./../schemas/category.schema');
const passport = require('passport');
const { checkAdminRole, checkRoles } = require('../middlewares/auth.handler')


const router = express.Router();
const service = new CategoryService();

router.get('/',
async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
checkRoles('admin', 'seller', 'customer'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const categoryItem = await service.findOne(id);
      res.json(categoryItem);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',

  //Si esta bien la autenticacion del token
  //en el payload vienen los roles.
  passport.authenticate('jwt', {session: false}),

  //Necesitamos crear una manera de hacer
  //mas mantenible y limpio el codigo
  //entonces a check lo vamos a modificar
  checkRoles('admin', 'seller'),
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {

      const body = req.body;
      const rta = await service.create(body);
      res.status(201).json(rta);
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await service.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
