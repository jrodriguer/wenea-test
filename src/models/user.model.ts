export class User {
    constructor(
        public address: string,
        public email: string,
        public name: string,
        public password: string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
    ) { }

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
            return null;
        }

        return this._token;
    }
}
