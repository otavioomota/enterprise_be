import { Router } from 'express';

import EmployeesController from '../controllers/EmployeesController';
import EmployeesByCompanyController from '../controllers/EmployeesByCompanyController';

const routes = Router();

const employeesController = new EmployeesController();
const employeesByCompanyController = new EmployeesByCompanyController();

routes.post('/', employeesController.store);
routes.get('/companies/:companyId', employeesByCompanyController.index);

export default routes;
