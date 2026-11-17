export interface AuthenticationStatusResolver {
  resolve(): Promise<void>;
  isAuthenticated: boolean;
}
