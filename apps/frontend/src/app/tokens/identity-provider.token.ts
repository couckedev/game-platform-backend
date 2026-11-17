import type { InjectionKey } from 'vue';
import type { IdentityProvider } from '@/player/infrastructure/authentication/common';

export const IdentityProviderToken = Symbol('IdentityProvider') as InjectionKey<IdentityProvider>;
