export class User {
  constructor(
    public uid: string,
    public name: string,
    public email: string,
    public role: string,
    private _token: string,
    private _tokenExpirationDate: number
    ) {}
    get token() {
      // if token expired return null; else return token.
      const currentTime = new Date();
      if (!this._tokenExpirationDate || 1 > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }
}
