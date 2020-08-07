export default interface ICreateAddressDTO {
  street: string;
  number: string;
  additional?: string;
  neighborhood: string;
  city: string;
  state: string;
  zip_code: string;
}
