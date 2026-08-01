import { createRemoteJWKSet } from 'jose';
import { JwtIdentityVerifier } from '../../authentication/jwt';
import { createDrizzleClient } from '../../database/drizzle';
import { HttpAuthenticationGuard } from '../../http/common';
import { createWinstonLogger } from '../../logging/winston';
import type { SharedModule } from './shared-module.interface';
import type { SharedModuleConfig } from './shared-module-config.interface';

export function createSharedModule(config: SharedModuleConfig): SharedModule {
  const authenticationKeyResolver = createRemoteJWKSet(
    new URL(config.authentication.jwksUrl),
  );
  const identityVerifier = new JwtIdentityVerifier(
    authenticationKeyResolver,
    config.authentication.issuerUrl,
  );
  const httpAuthenticationGuard = new HttpAuthenticationGuard(identityVerifier);
  return {
    httpAuthenticationGuard,
    logger: createWinstonLogger(config.logger),
    databaseClient: createDrizzleClient(config.database),
  };
}
