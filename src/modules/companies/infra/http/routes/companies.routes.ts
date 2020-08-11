import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import CompaniesController from '../controllers/CompaniesController';

const companiesRouter = Router();

const companiesController = new CompaniesController();
companiesRouter.get('/', companiesController.index);
companiesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      street: Joi.string().required(),
      number: Joi.string().required(),
      neighborhood: Joi.string().required(),
      additional: Joi.string(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zip_code: Joi.string().required(),
      name: Joi.string().required(),
      cnpj: Joi.string().required(),
    },
  }),
  companiesController.store,
);

export default companiesRouter;
