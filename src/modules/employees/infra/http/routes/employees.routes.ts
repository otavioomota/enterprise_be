import { Router } from 'express';

import EmployeesController from '../controllers/EmployeesController';
import EmployeesByCompanyController from '../controllers/EmployeesByCompanyController';

const employeesRouter = Router();

const employeesController = new EmployeesController();
const employeesByCompanyController = new EmployeesByCompanyController();

employeesRouter.post('/', employeesController.store);
employeesRouter.get(
  '/companies/:companyId',
  employeesByCompanyController.index,
);

export default employeesRouter;
