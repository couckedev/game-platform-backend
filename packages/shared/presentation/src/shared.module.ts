import { Global, Module } from "@nestjs/common";
import { SystemClock, WinstonLoggerAdapter } from "shared-infrastructure";
import { drizzle, NodePgDatabase } from "drizzle-orm/node-postgres";
import { ConfigService } from "@nestjs/config";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import type { Logger } from "winston";

@Global()
@Module({
  providers: [
    SystemClock,
    {
      provide: NodePgDatabase,
      useFactory: (config: ConfigService) =>
        drizzle(config.getOrThrow<string>("DATABASE_URL")),
      inject: [ConfigService],
    },
    {
      provide: WinstonLoggerAdapter,
      useFactory: (winstonLogger: Logger) =>
        new WinstonLoggerAdapter(winstonLogger),
      inject: [WINSTON_MODULE_PROVIDER],
    },
  ],
  exports: [SystemClock, NodePgDatabase, WinstonLoggerAdapter],
})
export class SharedModule {}
