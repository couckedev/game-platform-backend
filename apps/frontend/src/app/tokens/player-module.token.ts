import type { InjectionKey } from 'vue';
import type { PlayerModule } from '@/player/infrastructure/composition';

export const PlayerModuleToken = Symbol('PlayerModule') as InjectionKey<PlayerModule>;
