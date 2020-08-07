import { getRepository, Repository } from 'typeorm';

import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';
import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '../entities/Company';

class CompaniesRepository implements ICompaniesRepository {
  private ormRepository: Repository<Company>;

  constructor() {
    this.ormRepository = getRepository(Company);
  }

  public async create({
    name,
    cnpj,
    email,
  }: ICreateCompanyDTO): Promise<Company> {
    const company = this.ormRepository.create({ name, cnpj, email });

    await this.ormRepository.save(company);

    return company;
  }

  public async findById(id: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne(id);

    return company;
  }

  public async findByCnpj(cnpj: string): Promise<Company | undefined> {
    const company = await this.ormRepository.findOne({ where: { cnpj } });

    return company;
  }

  public async findAll(): Promise<Company[]> {
    const companies = await this.ormRepository.find();

    return companies;
  }
}

export default CompaniesRepository;
