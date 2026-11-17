import { InjectionToken } from '@nestjs/common';
import { IdentityVerifier } from '@/player/infrastructure/authentication/common';

export const IdentityVerifierToken = Symbol('IDENTITY_VERIFIER') as InjectionToken<
  IdentityVerifier<unknown>
>;
