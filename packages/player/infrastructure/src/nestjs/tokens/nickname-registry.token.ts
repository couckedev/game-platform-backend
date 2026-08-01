import type { InjectionToken } from '@nestjs/common';
import type { NicknameRegistry as NicknameRegistryType } from '@player/interface-adapters';

export const NicknameRegistry = Symbol(
  'NicknameRegistry',
) as InjectionToken<NicknameRegistryType>;
