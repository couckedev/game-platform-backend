import type { InjectionKey } from 'vue';
import type { IdentityProvider } from '@/app/authentication/common';

export const IdentityProviderToken = Symbol('IdentityProvider') as InjectionKey<IdentityProvider>;
