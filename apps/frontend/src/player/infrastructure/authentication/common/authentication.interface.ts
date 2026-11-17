export interface Authentication {
  startSignInProcess(): Promise<void>;
  restore(): Promise<void>;
  isAuthenticated: boolean;
}
