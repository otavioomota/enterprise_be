import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';
import IHashProvider from '@shared/container/providers/HashProvider/models/IHashProvider';
import IClientsRepository from '../repositories/IClientsRepository';

import Client from '../infra/typeorm/entities/Client';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  client: Client;
  token: string;
}

@injectable()
class AuthenticateClientService {
  constructor(
    @inject('ClientsRepository')
    private clientsRepository: IClientsRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const client = await this.clientsRepository.findByEmail(email);

    if (!client) {
      throw new AppError('User or Password does not match.');
    }

    const passwordCompare = await this.hashProvider.compareHash(
      password,
      client.password,
    );

    if (!passwordCompare) {
      throw new AppError('User or Password does not match.');
    }

    delete client.password;

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: client.id,
      expiresIn,
    });

    return {
      client,
      token,
    };
  }
}

export default AuthenticateClientService;
