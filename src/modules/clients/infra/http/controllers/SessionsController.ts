import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateClientService from '@modules/clients/services/AuthenticateClientService';

class SessionsController {
  async store(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateClient = container.resolve(AuthenticateClientService);

    const session = await authenticateClient.execute({ email, password });

    return response.json(session);
  }
}

export default SessionsController;
