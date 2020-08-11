import ICreateClientDTO from '@modules/clients/dtos/ICreateClientDTO';

import Client from '../infra/typeorm/entities/Client';

export default interface IClientsRepository {
  create(data: ICreateClientDTO): Promise<Client>;
  findByEmail(email: string): Promise<Client | undefined>;
  findAllByCompany(id: string): Promise<Client[]>;
}
