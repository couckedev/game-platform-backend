import type { RegisterPlayerOutputData } from '@player/application/features/register-player';
import type { PlayerRegistrationViewModel } from '../../view-models';

export class RegisterPlayerPresenter {
  private _viewModel: PlayerRegistrationViewModel | undefined;

  present(outputData: RegisterPlayerOutputData) {
    if (outputData.status === 'FAILURE') {
      this._viewModel = {
        status: 'FAILURE',
        rejectionReason: 'NICKNAME_TOO_SHORT',
      };
    } else {
      this._viewModel = { status: 'SUCCESS' };
    }
  }

  get viewModel(): PlayerRegistrationViewModel {
    if (this._viewModel === undefined) {
      throw new Error('Player registration view model has not been presented');
    }
    return this._viewModel;
  }
}
