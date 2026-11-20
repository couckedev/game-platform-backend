import type {
  RegisterPlayerOutputData,
  RegisterPlayerOutputPort,
} from '@/player/application/features/register-player';
import type { Translator } from '@/player/interface-adapters/ports';
import type { PlayerRegistrationViewModel } from './player-registration-view-model.interface';

export class RegisterPlayerPresenter implements RegisterPlayerOutputPort {
  private _viewModel: PlayerRegistrationViewModel | null = null;

  constructor(private readonly translator: Translator) {}

  present(outputData: RegisterPlayerOutputData): void {
    if ('errors' in outputData) {
      this._viewModel = {
        errors: {
          nickname: outputData.errors.nickname.map((nicknameErrorCode) => ({
            code: nicknameErrorCode,
            label: this.translator.translate(nicknameErrorCode),
          })),
        },
      };
      return;
    }
    this._viewModel = {
      errors: {
        nickname: [],
      },
      player: {
        nickname: outputData.player.nickname,
      },
    };
    return;
  }

  requireViewModel(): PlayerRegistrationViewModel {
    if (this._viewModel === null) {
      throw new Error('Player registration view model has not been presented yet');
    }
    return this._viewModel;
  }
}
