export interface Authentication {
  startSignInProcess(): Promise<void>;
  startSignOutProcess(): Promise<void>;
  restore(): Promise<void>;
  isAuthenticated: boolean;
}
