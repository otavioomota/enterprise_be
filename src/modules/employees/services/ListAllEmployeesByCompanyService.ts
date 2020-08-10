import { injectable, inject } from 'tsyringe';

import Employee from '@modules/employees/infra/typeorm/entities/Employee';
import IEmployeesRepository from '@modules/employees/repositories/IEmployeesRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  id: string;
}

@injectable()
class ListAllEmployeesByCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,

    @inject('EmployeesRepository')
    private employeesRepository: IEmployeesRepository,
  ) {}

  public async execute({ id }: IRequestDTO): Promise<Employee[]> {
    const companyExists = await this.companiesRepository.findById(id);

    if (!companyExists) {
      throw new AppError('Company does not exist.');
    }

    const employees = await this.employeesRepository.findAllEmployeesByCompany(
      id,
    );
    return employees;
  }
}

export default ListAllEmployeesByCompanyService;
