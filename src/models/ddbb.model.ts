export interface Address {
  city: string;
  zip: string;
  street: string;
  province: string;
}

export interface UserDoc {
  id: string;
  password: string;
  email: string;
  address: Address;
  name: string;
}
