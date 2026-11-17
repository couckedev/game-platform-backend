import type { InjectionKey } from 'vue';
import type { Authentication } from '@/player/infrastructure/authentication/common';

export const AuthenticationToken = Symbol('Authentication') as InjectionKey<Authentication>;
