import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateEmployeeService from '@modules/employees/services/CreateEmployeeService';

class EmployeesController {
  async store(request: Request, response: Response): Promise<Response> {
    const { full_name, role, email, password, company_id } = request.body;
    const createEmployee = container.resolve(CreateEmployeeService);

    const employee = await createEmployee.execute({
      full_name,
      role,
      email,
      password,
      company_id,
    });

    return response.json(employee);
  }
}

export default EmployeesController;
