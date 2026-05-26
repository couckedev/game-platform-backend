import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { passportJwtSecret } from "jwks-rsa";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthenticatedUser } from "./authenticated-user.interface";
import { JwtPayload } from "./jwt-payload.interface";

export const JWT_AUDIENCE = Symbol("JWT_AUDIENCE");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(ConfigService) config: ConfigService,
    @Inject(JWT_AUDIENCE) audience: string,
  ) {
    const keycloakUrl = config.getOrThrow<string>("KEYCLOAK_URL");
    const realm = config.getOrThrow<string>("KEYCLOAK_REALM");

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`,
      }),
      audience,
      issuer: `${keycloakUrl}/realms/${realm}`,
      algorithms: ["RS256"],
    });
  }

  validate(payload: JwtPayload): AuthenticatedUser | null {
    if (!payload.sub) {
      return null;
    }
    return {
      externalAccountId: payload.sub,
      email: payload.email,
    };
  }
}
