import { getRepository, Repository } from 'typeorm';
import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import ICreateAddressDTO from '@modules/addresses/dtos/ICreateAddressDTO';
import Address from '../entities/Address';

class AddressesRepository implements IAddressesRepository {
  private ormRepository: Repository<Address>;

  constructor() {
    this.ormRepository = getRepository(Address);
  }

  public async create({
    street,
    number,
    neighborhood,
    additional,
    city,
    state,
    zip_code,
  }: ICreateAddressDTO): Promise<Address> {
    const address = this.ormRepository.create({
      street,
      number,
      neighborhood,
      additional,
      city,
      state,
      zip_code,
    });

    await this.ormRepository.save(address);

    return address;
  }

  public async findById(id: string): Promise<Address | undefined> {
    const address = await this.ormRepository.findOne(id);

    return address;
  }
}

export default AddressesRepository;
