import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PlayerModule } from '@/player/infrastructure';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), PlayerModule],
})
export class AppModule {}
