export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string | null {
    const today = new Date();

    if (!this._tokenExpirationDate || this._tokenExpirationDate < today) {
      return null;
    }

    return this._token;
  }
}
