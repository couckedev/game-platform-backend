import { JWTVerifyGetKey } from 'jose';

export interface PlayerTestingModuleOptions {
  authenticationKeySource: JWTVerifyGetKey;
}
