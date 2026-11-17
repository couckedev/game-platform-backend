import type {
  RegisterPlayerOutput,
  RegisterPlayerOutputData,
} from '@/player/application/features/register-player';
import type { PlayerRegistrationViewModel } from './player-registration.view-model';

export class RegisterPlayerPresenter implements RegisterPlayerOutput {
  private _viewModel: PlayerRegistrationViewModel | null = null;

  present(outputData: RegisterPlayerOutputData): void {
    this._viewModel = {
      status: 'SUCCESS',
      registeredPlayer: outputData.registeredPlayer,
    };
  }

  requireViewModel(): PlayerRegistrationViewModel {
    if (this._viewModel === null) {
      throw new Error('Player registration view model has not been presenter');
    }
    return this._viewModel;
  }
}
