import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { WinstonModule } from "nest-winston";
import { format, transports } from "winston";
import { AuthModule } from "../auth";
import { SharedModule } from "shared-presentation";
import { PlayerModule } from "player-presentation";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    WinstonModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        level: config.get<string>("LOG_LEVEL", "info"),
        format: format.combine(
          format.timestamp(),
          format.errors({ stack: true }),
          format.json(),
        ),
        transports: [new transports.Console()],
      }),
    }),
    AuthModule,
    SharedModule,
    PlayerModule,
  ],
})
export class AppModule {}
