import { inject, injectable } from 'tsyringe';
import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequestDTO {
  name: string;
  email: string;
  cnpj: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ name, email, cnpj }: IRequestDTO): Promise<Company> {
    const companyExists = await this.companiesRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new Error('CNPJ already in use.');
    }

    const company = await this.companiesRepository.create({
      name,
      email,
      cnpj,
    });
    return company;
  }
}

export default CreateCompanyService;
