import { Repository, getRepository } from 'typeorm';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';

import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';

import ICreateEmployeeDTO from '@modules/employees/dtos/ICreateEmployeeDTO';

class EmployeesRepository implements IEmployeesRepository {
  ormRepository: Repository<Employee>;

  constructor() {
    this.ormRepository = getRepository(Employee);
  }

  public async create({
    full_name,
    role,
    email,
    password,
    company_id,
  }: ICreateEmployeeDTO): Promise<Employee> {
    const employee = this.ormRepository.create({
      full_name,
      role,
      email,
      password,
      company_id,
    });

    await this.ormRepository.save(employee);

    return employee;
  }

  public async findByEmail(email: string): Promise<Employee | undefined> {
    const employee = await this.ormRepository.findOne({ where: { email } });

    return employee;
  }

  public async findAllEmployeesByCompany(id: string): Promise<Employee[]> {
    const employees = await this.ormRepository.find({
      where: { company_id: id },
    });

    return employees;
  }
}

export default EmployeesRepository;
