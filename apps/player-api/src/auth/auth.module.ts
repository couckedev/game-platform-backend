import { Global, Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JWT_AUDIENCE, JwtAuthGuard, JwtStrategy } from "shared-presentation";

@Global()
@Module({
  imports: [PassportModule.register({ defaultStrategy: "jwt" })],
  providers: [
    { provide: JWT_AUDIENCE, useValue: "player-api" },
    JwtStrategy,
    JwtAuthGuard,
  ],
  exports: [JwtAuthGuard],
})
export class AuthModule {}
