export class InMemoryAuthenticationServer {
  public isAuthenticated = false;

  authenticate() {
    this.isAuthenticated = true;
  }
}
