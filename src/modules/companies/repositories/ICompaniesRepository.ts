import ICreateCompanyDTO from '@modules/companies/dtos/ICreateCompanyDTO';
import Company from '../infra/typeorm/entities/Company';

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  findById(id: string): Promise<Company | undefined>;
  findByCnpj(cnpj: string): Promise<Company | undefined>;
  findAll(): Promise<Company[]>;
}

export default ICompaniesRepository;
