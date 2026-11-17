export class InMemoryIdentityProviderServer {
  private _identity: string | null = null;

  setIdentity(identity: string) {
    this._identity = identity;
  }

  requireIdentity(): string {
    if (this._identity === null) {
      throw new Error('Identity must be set on in memory identity provider server before using it');
    }
    return this._identity;
  }

  get identity(): string | null {
    return this._identity;
  }

  signOut() {
    this._identity = null;
  }
}
