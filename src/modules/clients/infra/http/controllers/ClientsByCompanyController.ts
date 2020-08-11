import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllClientsByCompanyService from '@modules/clients/services/ListAllClientsByCompanyService';

class ClientsByCompanyController {
  async index(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;
    const listAllClientsByCompany = container.resolve(
      ListAllClientsByCompanyService,
    );

    const clients = await listAllClientsByCompany.execute({
      company_id: companyId,
    });

    return response.json(clients);
  }
}

export default ClientsByCompanyController;
