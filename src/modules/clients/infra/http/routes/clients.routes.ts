import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ClientsController from '../controllers/ClientsController';
import ClientsByCompanyController from '../controllers/ClientsByCompanyController';

const clientsRouter = Router();

const clientsController = new ClientsController();
const clientsByCompanyController = new ClientsByCompanyController();

clientsRouter.post(
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
      surname: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().required(),
      cpf: Joi.string().required(),
      phone1: Joi.string(),
      phone2: Joi.string(),
      born_date: Joi.date(),
      company_id: Joi.string().uuid().required(),
    },
  }),
  clientsController.store,
);

clientsRouter.get(
  '/companies/:companyId',
  celebrate({
    [Segments.PARAMS]: {
      companyId: Joi.string().uuid().required(),
    },
  }),
  clientsByCompanyController.index,
);

export default clientsRouter;
