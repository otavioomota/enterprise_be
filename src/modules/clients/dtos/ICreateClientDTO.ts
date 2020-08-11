export default interface ICreateClientDTO {
  name: string;
  surname: string;
  email: string;
  password: string;
  cpf: string;
  born_date?: Date;
  phone1?: string;
  phone2?: string;
  company_id: string;
  address_id: string;
}
