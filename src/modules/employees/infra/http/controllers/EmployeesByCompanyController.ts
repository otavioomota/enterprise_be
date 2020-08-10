import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllEmployeesByCompanyService from '@modules/employees/services/ListAllEmployeesByCompanyService';

class EmployeesByCompanyController {
  async index(request: Request, response: Response): Promise<Response> {
    const { companyId } = request.params;

    const listAllEmployeesByCompany = container.resolve(
      ListAllEmployeesByCompanyService,
    );

    const employees = await listAllEmployeesByCompany.execute({
      id: companyId,
    });

    return response.json(employees);
  }
}

export default EmployeesByCompanyController;
