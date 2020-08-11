import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const routes = Router();

const clientsController = new ClientsController();

routes.post('/', clientsController.store);

export default routes;
