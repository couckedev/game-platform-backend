import type {
  RegisterPlayerOutputData,
  RegisterPlayerOutputPort,
} from '@/player/application/features/register-player';
import type { PlayerRegistrationViewModel } from './player-registration-view-model.interface';

export class RegisterPlayerPresenter implements RegisterPlayerOutputPort {
  private _viewModel: PlayerRegistrationViewModel | null = null;

  private readonly nicknameErrorMapping = new Map<string, string>([
    ['NICKNAME_TOO_SHORT', 'Nickname is too short'],
    ['NICKNAME_TOO_LONG', 'Nickname is too long'],
  ]);

  present(outputData: RegisterPlayerOutputData): void {
    if (outputData.status === 'FAILURE') {
      this._viewModel = {
        status: 'FAILURE',
        errors: {
          nickname: outputData.errors.nickname.map((nicknameError) => ({
            code: nicknameError,
            label: this.resolveNicknameErrorLabel(nicknameError),
          })),
        },
      };
      return;
    }
    this._viewModel = {
      status: 'SUCCESS',
      errors: {
        nickname: [],
      },
    };
  }

  private resolveNicknameErrorLabel(code: string) {
    const label = this.nicknameErrorMapping.get(code);
    if (label === undefined) {
      throw new Error(`Nickname error label not found for code ${code}`);
    }
    return label;
  }

  requireViewModel(): PlayerRegistrationViewModel {
    if (this._viewModel === null) {
      throw new Error('Player registration view model has not been presented yet');
    }
    return this._viewModel;
  }
}
