import { injectable, inject } from 'tsyringe';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICompaniesRepository from '@modules/companies/repositories/ICompaniesRepository';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import AppError from '@shared/errors/AppError';

interface IRequestDTO {
  company_id: string;
}

@injectable()
class ListAllClientsServiceByCompany {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompaniesRepository,
  ) {}

  public async execute({ company_id }: IRequestDTO): Promise<Client[]> {
    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company does not exist.');
    }

    const clients = await this.clientsRepository.findAllByCompany(company_id);

    return clients;
  }
}

export default ListAllClientsServiceByCompany;
