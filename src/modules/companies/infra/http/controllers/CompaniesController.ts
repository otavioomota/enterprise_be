import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAddressService from '@modules/addresses/services/CreateAddressService';
import CreateCompanyService from '@modules/companies/services/CreateCompanyService';
import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';
import ListAllCompaniesService from '@modules/companies/services/ListAllCompaniesService';

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
      cnpj,
    } = request.body;

    const createAddress = container.resolve(CreateAddressService);

    const createCompany = container.resolve(CreateCompanyService);

    const createEmployee = container.resolve(CreateEmployeeService);

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
      cnpj,
      address_id: address.id,
    });

    const employee = await createEmployee.execute({
      full_name: `Admin ${name}`,
      email: `${name}exemplo.com`,
      password: `${name}123`,
      role: 'admin',
      company_id: company.id,
    });

    return response.json(employee);
  }
}

export default CompaniesController;
