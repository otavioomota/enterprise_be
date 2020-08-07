import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Company from '../infra/typeorm/entities/Company';
import ICompaniesRepository from '../repositories/ICompaniesRepository';

interface IRequestDTO {
  name: string;
  email: string;
  cnpj: string;
  address_id: string;
}

@injectable()
class CreateCompanyService {
  constructor(
    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({
    name,
    email,
    cnpj,
    address_id,
  }: IRequestDTO): Promise<Company> {
    const companyExists = await this.companiesRepository.findByCnpj(cnpj);

    if (companyExists) {
      throw new AppError('CNPJ already in use.');
    }

    const company = await this.companiesRepository.create({
      name,
      email,
      cnpj,
      address_id,
    });
    return company;
  }
}

export default CreateCompanyService;
