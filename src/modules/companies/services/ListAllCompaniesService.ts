import { injectable, inject } from 'tsyringe';

import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

@injectable()
class ListAllCompaniesService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute(): Promise<Company[]> {
    const companies = await this.companiesRepository.findAll();

    return companies;
  }
}

export default ListAllCompaniesService;
