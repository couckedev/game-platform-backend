import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { createRemoteJWKSet } from 'jose';
import { provideRegisterPlayerFeature } from '@/player/infrastructure/features/register-player';
import { DrizzlePlayerRepository } from '@/player/infrastructure/persistence/drizzle';
import * as schema from '@/player/infrastructure/persistence/drizzle/schemas';
import { RandomUuidGenerator } from '@/player/infrastructure/persistence/random-uuid';
import { JwtIdentityVerifier } from '../../authentication/jwt';
import { provideAuthenticatePlayerFeature } from '../../features/authenticate-player';
import { AuthenticationGuard } from '../authentication.guard';
import { PlayerController } from '../player.controller';
import {
  AuthenticatePlayerFeatureToken,
  IdentityVerifierToken,
  PlayerRepositoryToken,
  RegisterPlayerFeatureToken,
  UniqueIdGeneratorToken,
} from '../tokens';

@Module({
  controllers: [PlayerController],
  providers: [
    {
      provide: PlayerRepositoryToken,
      useFactory: (database: NodePgDatabase<typeof schema>) =>
        new DrizzlePlayerRepository(database),
      inject: [NodePgDatabase],
    },
    {
      provide: NodePgDatabase,
      useFactory: (config: ConfigService) =>
        drizzle({
          connection: {
            connectionString: config.getOrThrow<string>('DATABASE_URL'),
            max: 5,
          },
          schema,
        }),
      inject: [ConfigService],
    },
    {
      provide: UniqueIdGeneratorToken,
      useValue: new RandomUuidGenerator(),
    },
    {
      provide: IdentityVerifierToken,
      useFactory: (config: ConfigService) => {
        const keycloakIssuerUrl = config.getOrThrow<string>('KEYCLOAK_ISSUER_URL');
        const keycloakJwksUrl = `${keycloakIssuerUrl}/protocol/openid-connect/certs`;
        const keySource = createRemoteJWKSet(new URL(keycloakJwksUrl));
        return new JwtIdentityVerifier(keySource);
      },
      inject: [ConfigService],
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
})
export class PlayerModule {}
