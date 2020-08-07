import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import ListAllCompaniesService from '@modules/companies/services/ListAllCompaniesService';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';

class CompaniesController {
  async index(request: Request, response: Response): Promise<Response> {
    const listAllCompanies = container.resolve(ListAllCompaniesService);

    const companies = await listAllCompanies.execute();

    return response.json(companies);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const {
      street,
      number,
      neighborhood,
      additional,
      city,
      state,
      zip_code,
      name,
      email,
      cnpj,
    } = request.body;

    const createAddress = container.resolve(CreateAddressService);

    const createCompany = container.resolve(CreateCompanyService);

    const address = await createAddress.execute({
      street,
      number,
      neighborhood,
      additional,
      city,
      state,
      zip_code,
    });

    const company = await createCompany.execute({
      name,
      email,
      cnpj,
      address_id: address.id,
    });

    return response.json(company);
  }
}

export default CompaniesController;
