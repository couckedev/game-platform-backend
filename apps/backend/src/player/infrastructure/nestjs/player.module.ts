import { Module } from '@nestjs/common';
import { provideRegisterPlayerFeature } from '@/player/infrastructure/features/register-player';
import { PlayerController } from './player.controller';
import { RegisterPlayerFeatureToken } from './tokens';

@Module({
  controllers: [PlayerController],
  providers: [
    { provide: RegisterPlayerFeatureToken, useFactory: () => provideRegisterPlayerFeature() },
  ],
})
export class PlayerModule {}
