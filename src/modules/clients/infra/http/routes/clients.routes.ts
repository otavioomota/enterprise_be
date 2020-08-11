import { Router } from 'express';
import ClientsController from '../controllers/ClientsController';

const clientsRouter = Router();

const clientsController = new ClientsController();

clientsRouter.post('/', clientsController.store);

export default clientsRouter;
