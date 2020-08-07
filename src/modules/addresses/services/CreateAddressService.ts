import { injectable, inject } from 'tsyringe';

import IAddressesRepository from '@modules/addresses/repositories/IAddressesRepository';
import Address from '../infra/typeorm/entities/Address';

interface IRequestDTO {
  street: string;
  number: string;
  neighborhood: string;
  additional: string;
  city: string;
  state: string;
  zip_code: string;
}
@injectable()
class CreateAddressService {
  constructor(
    @inject('AddressesRepository')
    private addressesRepository: IAddressesRepository,
  ) {}

  public async execute({
    street,
    number,
    neighborhood,
    additional,
    city,
    state,
    zip_code,
  }: IRequestDTO): Promise<Address> {
    const address = await this.addressesRepository.create({
      street,
      number,
      neighborhood,
      additional,
      city,
      state,
      zip_code,
    });
    return address;
  }
}

export default CreateAddressService;
