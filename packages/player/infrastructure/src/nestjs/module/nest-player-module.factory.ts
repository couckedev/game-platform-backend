import type { DynamicModule } from '@nestjs/common';
import type { NicknameRegistry as NicknameRegistryType } from '@player/interface-adapters';
import type { DatabaseClient as DatabaseClientType } from '@shared/infrastructure';
import {
  DatabaseClient,
  NestHttpAuthenticationGuard,
} from '@shared/infrastructure/nestjs';
import { createPlayerModule } from '../../composition';
import { DrizzleNicknameRegistry } from '../../persistence/drizzle/nickname-registry/drizzle-nickname-registry';
import { NestPlayerController } from '../controllers';
import { RegisterPlayerFeature } from '../tokens';
import { NicknameRegistry } from '../tokens/nickname-registry.token';
import { PlayerModule } from '../tokens/player-module.token';
import { NestPlayerModule } from './nest-player.module';

export function createNestPlayerModule(): DynamicModule {
  return {
    module: NestPlayerModule,
    providers: [
      {
        provide: NicknameRegistry,
        useFactory: (databaseClient: DatabaseClientType) =>
          new DrizzleNicknameRegistry(databaseClient),
        inject: [DatabaseClient],
      },
      {
        provide: PlayerModule,
        useFactory: (nicknameRegistry: NicknameRegistryType) =>
          createPlayerModule({ nicknameRegistry }),
        inject: [NicknameRegistry],
      },
      {
        provide: RegisterPlayerFeature,
        useFactory: (playerModule) => playerModule.registerPlayer,
        inject: [PlayerModule],
      },
    ],
    controllers: [NestPlayerController],
  };
}
