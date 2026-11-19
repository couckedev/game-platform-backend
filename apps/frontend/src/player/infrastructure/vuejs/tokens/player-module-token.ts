import type { InjectionKey } from 'vue';
import type { PlayerModule } from '@/player/infrastructure/vuejs';

export const PlayerModuleToken = Symbol('PlayerModule') as InjectionKey<PlayerModule>;
