/** biome-ignore-all lint/complexity/noStaticOnlyClass: <Nest module factory method for tests> */

import { DynamicModule, Module } from '@nestjs/common';
import { JwtIdentityVerifier } from '@/player/infrastructure/authentication/jwt';
import { provideAuthenticatePlayerFeature } from '@/player/infrastructure/features/authenticate-player';
import { provideRegisterPlayerFeature } from '@/player/infrastructure/features/register-player';
import { InMemoryPlayerRepository } from '@/player/infrastructure/persistence/in-memory';
import { RandomUuidGenerator } from '@/player/infrastructure/persistence/random-uuid';
import { AuthenticationGuard } from '../authentication.guard';
import { PlayerController } from '../player.controller';
import {
  AuthenticatePlayerFeatureToken,
  IdentityVerifierToken,
  PlayerRepositoryToken,
  RegisterPlayerFeatureToken,
  UniqueIdGeneratorToken,
} from '../tokens';
import { PlayerTestingModuleOptions } from './player-testing-module-options.interface';

@Module({})
export class PlayerTestingModule {
  static forRoot(options: PlayerTestingModuleOptions): DynamicModule {
    return {
      module: PlayerTestingModule,
      controllers: [PlayerController],
      providers: [
        {
          provide: PlayerRepositoryToken,
          useValue: new InMemoryPlayerRepository(),
        },
        {
          provide: UniqueIdGeneratorToken,
          useValue: new RandomUuidGenerator(),
        },
        {
          provide: IdentityVerifierToken,
          useValue: new JwtIdentityVerifier(options.authenticationKeySource),
        },
        {
          provide: RegisterPlayerFeatureToken,
          useFactory: (playerRepository, uniqueIdGenerator) =>
            provideRegisterPlayerFeature(playerRepository, uniqueIdGenerator),
          inject: [PlayerRepositoryToken, UniqueIdGeneratorToken],
        },
        {
          provide: AuthenticatePlayerFeatureToken,
          useFactory: (playerRepository) => provideAuthenticatePlayerFeature(playerRepository),
          inject: [PlayerRepositoryToken],
        },
        AuthenticationGuard,
      ],
    };
  }
}
