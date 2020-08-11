import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import EmployeesController from '../controllers/EmployeesController';
import EmployeesByCompanyController from '../controllers/EmployeesByCompanyController';

const employeesRouter = Router();

const employeesController = new EmployeesController();
const employeesByCompanyController = new EmployeesByCompanyController();

employeesRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      full_name: Joi.string().required(),
      role: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
      company_id: Joi.string().uuid().required(),
    },
  }),
  employeesController.store,
);
employeesRouter.get(
  '/companies/:companyId',
  celebrate({
    [Segments.PARAMS]: {
      companyId: Joi.string().uuid().required(),
    },
  }),
  employeesByCompanyController.index,
);

export default employeesRouter;
