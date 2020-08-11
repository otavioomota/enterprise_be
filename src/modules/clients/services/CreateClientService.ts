import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Client from '@modules/clients/infra/typeorm/entities/Client';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import ICompanyRepository from '@modules/companies/repositories/ICompaniesRepository';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IClientsRepository from '../repositories/IClientsRepository';

interface IRequestDTO {
  name: string;
  surname: string;
  email: string;
  cpf: string;
  password: string;
  phone1?: string;
  phone2?: string;
  born_date?: Date;
  company_id: string;
  address_id: string;
}

@injectable()
class CreateClientService {
  constructor(
    @inject('AddressesRepository')
    private addressRepository: IAddressesRepository,

    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('CompaniesRepository')
    private companiesRepository: ICompanyRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    surname,
    email,
    password,
    cpf,
    phone1,
    phone2,
    born_date,
    company_id,
    address_id,
  }: IRequestDTO): Promise<Client> {
    const addressExists = await this.addressRepository.findById(address_id);

    if (!addressExists) {
      throw new AppError('Address does not exist.');
    }

    const companyExists = await this.companiesRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError('Company does not exist.');
    }

    const password_hashed = await this.hashProvider.generateHash(password);

    const client = await this.clientsRepository.create({
      name,
      surname,
      email,
      password: password_hashed,
      phone1,
      phone2,
      cpf,
      born_date,
      company_id,
      address_id,
    });

    return client;
  }
}

export default CreateClientService;
