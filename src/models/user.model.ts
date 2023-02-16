import { Address } from './interfaces.model';

export class User {
  constructor(
    public email: string,
    public uid: string,
    public name: string,
    private _token: string,
    // public password?: string
    private _tokenExpirationDate?: Date,
    public address?: Address
  ) {}

  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }

    return this._token;
  }
}
