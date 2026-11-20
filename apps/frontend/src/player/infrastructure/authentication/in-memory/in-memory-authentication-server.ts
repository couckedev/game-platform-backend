export class InMemoryAuthenticationServer {
  public isAuthenticated = false;

  signIn() {
    this.isAuthenticated = true;
  }

  signOut() {
    this.isAuthenticated = false;
  }
}
