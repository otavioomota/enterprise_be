import { Router } from 'express';
import companiesRouter from '@modules/companies/infra/http/routes/companies.routes';
import employeesRouter from '@modules/employees/infra/http/routes/employees.routes';
import clientsRouter from '@modules/clients/infra/http/routes/clients.routes';

const routes = Router();

routes.use('/companies', companiesRouter);
routes.use('/employees', employeesRouter);
routes.use('/clients', clientsRouter);

export default routes;
