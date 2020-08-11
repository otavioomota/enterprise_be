import { Repository, getRepository } from 'typeorm';

import IClientsRepository from '@modules/clients/repositories/IClientsRepository';
import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';
import Client from '../entities/Client';

class ClientsRepository implements IClientsRepository {
  private ormRepository: Repository<Client>;

  constructor() {
    this.ormRepository = getRepository(Client);
  }

  public async create({
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
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepository.create({
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
    });

    await this.ormRepository.save(client);

    return client;
  }

  public async findByEmail(email: string): Promise<Client | undefined> {
    const client = await this.ormRepository.findOne({ where: { email } });

    return client;
  }
}

export default ClientsRepository;
