import { Address } from './interfaces.model';

export class User {
  constructor(
    public address: Address,
    public email: string,
    public id: string,
    public name: string,
    private _token: string,
    private _tokenExpirationDate: Date,
    public password?: string
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
