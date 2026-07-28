import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from '@shared/infrastructure/nestjs';
import { HealthcheckController } from '../controllers/index.js';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule],
  controllers: [HealthcheckController],
})
export class AppModule {}
