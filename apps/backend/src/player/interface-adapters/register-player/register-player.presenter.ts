import {
  RegisterPlayerOutput,
  RegisterPlayerOutputData,
} from '@/player/application/register-player';
import { PlayerRegistrationViewModel } from './player-registration.view-model';

export class RegisterPlayerPresenter implements RegisterPlayerOutput {
  private _viewModel: PlayerRegistrationViewModel | null = null;

  present(outputData: RegisterPlayerOutputData): void {
    if (outputData.status === 'FAILURE') {
      this._viewModel = { status: 'FAILURE', reason: outputData.reason };
      return;
    }
    this._viewModel = { status: 'SUCCESS' };
    return;
  }

  requireViewModel(): PlayerRegistrationViewModel {
    if (this._viewModel === null)
      throw new Error('Player registration view model has not been presented yet');
    return this._viewModel;
  }
}
