export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
    ) {}
    get token() {
      // if token expired return null; else return token.
      const currentTime = new Date();
      if (!this._tokenExpirationDate || currentTime > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
}
