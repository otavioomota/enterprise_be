import { Router } from 'express';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/employees', employeesRouter);

export default routes;
