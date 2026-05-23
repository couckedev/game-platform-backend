import { Module } from "@nestjs/common";
import { PlayerController } from "./controller/player.controller";
import { GetPlayerUseCase, RegisterPlayerUseCase } from "player-application";
import {
  DrizzleNicknameUniquenessChecker,
  DrizzlePlayerRepository,
  DrizzleExternalAccountIdUniquenessChecker,
} from "player-infrastructure";
import { SystemClock, WinstonLoggerAdapter } from "shared-infrastructure";
import { NodePgDatabase } from "drizzle-orm/node-postgres";

@Module({
  controllers: [PlayerController],
  providers: [
    {
      provide: RegisterPlayerUseCase,
      useFactory: (
        systemClock: SystemClock,
        playerRepository: DrizzlePlayerRepository,
        nicknameUniquenessChecker: DrizzleNicknameUniquenessChecker,
        externalAccountIdUniquenessChecker: DrizzleExternalAccountIdUniquenessChecker,
        logger: WinstonLoggerAdapter,
      ) =>
        new RegisterPlayerUseCase(
          systemClock,
          playerRepository,
          nicknameUniquenessChecker,
          externalAccountIdUniquenessChecker,
          logger,
        ),
      inject: [
        SystemClock,
        DrizzlePlayerRepository,
        DrizzleNicknameUniquenessChecker,
        DrizzleExternalAccountIdUniquenessChecker,
        WinstonLoggerAdapter,
      ],
    },
    {
      provide: GetPlayerUseCase,
      useFactory: (playerRepository: DrizzlePlayerRepository) =>
        new GetPlayerUseCase(playerRepository),
      inject: [DrizzlePlayerRepository],
    },
    {
      provide: DrizzlePlayerRepository,
      useFactory: (database: NodePgDatabase) =>
        new DrizzlePlayerRepository(database),
      inject: [NodePgDatabase],
    },
    {
      provide: DrizzleNicknameUniquenessChecker,
      useFactory: (database: NodePgDatabase) =>
        new DrizzleNicknameUniquenessChecker(database),
      inject: [NodePgDatabase],
    },
    {
      provide: DrizzleExternalAccountIdUniquenessChecker,
      useFactory: (database: NodePgDatabase) =>
        new DrizzleExternalAccountIdUniquenessChecker(database),
      inject: [NodePgDatabase],
    },
  ],
})
export class PlayerModule {}
