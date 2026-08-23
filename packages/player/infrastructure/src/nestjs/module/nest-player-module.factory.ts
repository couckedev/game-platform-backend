import type { DynamicModule } from '@nestjs/common';
import type {
  NicknameRegistry as NicknameRegistryType,
  PlayerIdGenerator as PlayerIdGeneratorType,
  PlayerRegistrar as PlayerRegistrarType,
  PlayerRepository as PlayerRepositoryType,
} from '@player/interface-adapters';
import type { DatabaseClient as DatabaseClientType } from '@shared/infrastructure';
import { DatabaseClient } from '@shared/infrastructure/nestjs';
import { createPlayerModule } from '../../composition';
import { DrizzleNicknameRegistry } from '../../persistence/drizzle/nickname-registry/drizzle-nickname-registry';
import { DrizzlePlayerRegistrar } from '../../persistence/drizzle/player-registrar/drizzle-player-registrar';
import { DrizzlePlayerRepository } from '../../persistence/drizzle/player-repository/drizzle-player-repository';
import { UuidPlayerIdGenerator } from '../../persistence/uuid/player-id-generator';
import { NestPlayerController } from '../controllers';
import {
  AuthenticatePlayerFeature,
  NicknameRegistry,
  PlayerIdGenerator,
  PlayerRegistrar,
  PlayerRepository,
  RegisterPlayerFeature,
} from '../tokens';
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
        provide: PlayerIdGenerator,
        useValue: new UuidPlayerIdGenerator(),
      },
      {
        provide: PlayerRegistrar,
        useFactory: (databaseClient: DatabaseClientType) =>
          new DrizzlePlayerRegistrar(databaseClient),
        inject: [DatabaseClient],
      },
      {
        provide: PlayerRepository,
        useFactory: (databaseClient: DatabaseClientType) =>
          new DrizzlePlayerRepository(databaseClient),
        inject: [DatabaseClient],
      },
      {
        provide: PlayerModule,
        useFactory: (
          nicknameRegistry: NicknameRegistryType,
          playerIdGenerator: PlayerIdGeneratorType,
          playerRegistrar: PlayerRegistrarType,
          playerRepository: PlayerRepositoryType,
        ) =>
          createPlayerModule({
            nicknameRegistry,
            playerIdGenerator,
            playerRegistrar,
            playerRepository,
          }),
        inject: [
          NicknameRegistry,
          PlayerIdGenerator,
          PlayerRegistrar,
          PlayerRepository,
        ],
      },
      {
        provide: RegisterPlayerFeature,
        useFactory: (playerModule) => playerModule.registerPlayer,
        inject: [PlayerModule],
      },
      {
        provide: AuthenticatePlayerFeature,
        useFactory: (playerModule) => playerModule.authenticatePlayer,
        inject: [PlayerModule],
      },
    ],
    controllers: [NestPlayerController],
  };
}
