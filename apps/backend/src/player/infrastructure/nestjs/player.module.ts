import { InjectionToken, Module } from '@nestjs/common';
import { Nickname, NicknameAlreadyTakenError, NicknameRegistry } from '@/player/domain';
import { provideRegisterPlayerFeature } from '@/player/infrastructure/features/register-player';
import { PlayerController } from './player.controller';
import { RegisterPlayerFeatureToken } from './tokens';

const NicknameRegistryToken = Symbol('NICKNAME_REGISTRY') as InjectionToken<NicknameRegistry>;
class InMemoryNicknameRegistry implements NicknameRegistry {
  constructor(private readonly _takenNicknames: Nickname[] = []) {}

  register(nickname: Nickname): void {
    if (
      this._takenNicknames.find((takenNickname) => takenNickname.equals(nickname)) !== undefined
    ) {
      throw new NicknameAlreadyTakenError();
    }
    this._takenNicknames.push(nickname);
  }
}

@Module({
  controllers: [PlayerController],
  providers: [
    {
      provide: NicknameRegistryToken,
      useValue: new InMemoryNicknameRegistry(),
    },
    {
      provide: RegisterPlayerFeatureToken,
      useFactory: (nicknameRegistry) => provideRegisterPlayerFeature(nicknameRegistry),
      inject: [NicknameRegistryToken],
    },
  ],
})
export class PlayerModule {}
