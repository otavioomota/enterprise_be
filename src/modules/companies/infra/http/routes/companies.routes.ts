import { Router } from 'express';

import CompaniesController from '../controllers/CompaniesController';

const companiesRouter = Router();

const companiesController = new CompaniesController();
companiesRouter.get('/', companiesController.index);
companiesRouter.post('/', companiesController.store);

export default companiesRouter;
