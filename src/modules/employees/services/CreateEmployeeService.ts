import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import Employee from '../infra/typeorm/entities/Employee';

import IEmployeesRepository from '../repositories/IEmployeesRepository';

interface IRequestDTO {
  full_name: string;
  role: string;
  email: string;
  password: string;
  company_id: string;
}

@injectable()
class CreateEmployeeService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    full_name,
    role,
    email,
    password,
    company_id,
  }: IRequestDTO): Promise<Employee> {
    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company does not exist.');
    }

    const emailExists = await this.employeesRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already in use.');
    }

    const password_hashed = await this.hashProvider.generateHash(password);

    const employee = await this.employeesRepository.create({
      full_name,
      role,
      email,
      password: password_hashed,
      company_id,
    });

    return employee;
  }
}

export default CreateEmployeeService;
