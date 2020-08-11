import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '../infra/typeorm/entities/Address';

interface IAddressesRepository {
  create(data: ICreateAddressDTO): Promise<Address>;
  findById(id: string): Promise<Address | undefined>;
}

export default IAddressesRepository;
