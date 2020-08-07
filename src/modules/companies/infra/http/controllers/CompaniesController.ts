import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import ListAllCompaniesService from '@modules/companies/services/ListAllCompaniesService';

class CompaniesController {
  async index(request: Request, response: Response): Promise<Response> {
    const listAllCompanies = container.resolve(ListAllCompaniesService);

    const companies = await listAllCompanies.execute();

    return response.json(companies);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, cnpj } = request.body;

    const createCompany = container.resolve(CreateCompanyService);

    const company = await createCompany.execute({
      name,
      email,
      cnpj,
    });

    return response.json(company);
  }
}

export default CompaniesController;
