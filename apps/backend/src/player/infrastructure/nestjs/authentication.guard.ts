import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import type {
  Authenticated,
  IdentityVerifier,
} from '@/player/infrastructure/authentication/common';
import { IdentityVerifierToken } from './tokens';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    @Inject(IdentityVerifierToken)
    private readonly identityVerifier: IdentityVerifier<unknown>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    const [scheme, token] = (request.headers.authorization ?? '').split(' ');
    if (scheme !== 'Bearer' || !token) throw new UnauthorizedException();
    try {
      const authenticatedIdentity = await this.identityVerifier.verify({ token });
      (request as FastifyRequest & Authenticated).identity = authenticatedIdentity;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
