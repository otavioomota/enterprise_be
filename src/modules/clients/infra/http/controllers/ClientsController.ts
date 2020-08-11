import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import CreateClientService from '@modules/clients/services/CreateClientService';

class ClientsController {
  async store(request: Request, response: Response) {
    const {
      street,
      number,
      neighborhood,
      additional,
      city,
      state,
      zip_code,
      name,
      surname,
      email,
      password,
      cpf,
      phone1,
      phone2,
      born_date,
      company_id,
    } = request.body;

    const createAddress = container.resolve(CreateAddressService);
    const createClient = container.resolve(CreateClientService);

    const address = await createAddress.execute({
      street,
      number,
      neighborhood,
      additional,
      city,
      state,
      zip_code,
    });
    const client = await createClient.execute({
      name,
      surname,
      email,
      password,
      cpf,
      phone1,
      phone2,
      born_date,
      company_id,
      address_id: address.id,
    });

    return response.json(client);
  }
}

export default ClientsController;
