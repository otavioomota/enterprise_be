import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Address from '@modules/addresses/infra/typeorm/entities/Address';
import Company from '@modules/companies/infra/typeorm/entities/Company';

@Entity('clients')
class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  surname: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column('timestamp with time zone')
  born_date: Date;

  @Column()
  phone1: string;

  @Column()
  phone2: string;

  @Column()
  password: string;

  @Column()
  company_id: string;

  @OneToOne(() => Company, { eager: true })
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  address_id: string;

  @OneToOne(() => Address, { eager: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Client;
