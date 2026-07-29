import type { DynamicModule } from '@nestjs/common';
import { createPlayerModule } from '../../composition';
import { NestPlayerController } from '../controllers';
import { RegisterPlayerFeature } from '../tokens';
import { NestPlayerModule } from './nest-player.module';

export function createNestPlayerModule(): DynamicModule {
  const playerModule = createPlayerModule();
  return {
    module: NestPlayerModule,
    providers: [
      { provide: RegisterPlayerFeature, useValue: playerModule.registerPlayer },
    ],
    controllers: [NestPlayerController],
  };
}
