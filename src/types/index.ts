export interface IAddress {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export interface IData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: IAddress,
  description: string;
}

export interface Columns<T> {
  title: keyof T;
  key: string;
  render?: (value: unknown) => string;
  sorted?: boolean;
  width?: string;
}