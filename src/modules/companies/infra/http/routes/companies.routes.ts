import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';

const routes = Router();

const companiesController = new CompaniesController();
routes.get('/', companiesController.index);
routes.post('/', companiesController.store);

export default routes;
