import Employee from '@modules/employees/infra/typeorm/entities/Employee';

import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

interface IEmployeesRepository {
  create(data: ICreateEmployeeDTO): Promise<Employee>;
  findByEmail(email: string): Promise<Employee | undefined>;
  findAllEmployeesByCompany(id: string): Promise<Employee[]>;
}

export default IEmployeesRepository;
