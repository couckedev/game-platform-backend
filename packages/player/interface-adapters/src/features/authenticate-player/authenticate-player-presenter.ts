import type { AuthenticatePlayerOutputData } from '@player/application/features/authenticate-player';
import type { PlayerAuthenticationViewModel } from '../../view-models';

export class AuthenticatePlayerPresenter {
  private _viewModel: PlayerAuthenticationViewModel | undefined;

  present(outputData: AuthenticatePlayerOutputData) {
    this._viewModel = outputData;
  }

  get viewModel(): PlayerAuthenticationViewModel {
    if (this._viewModel === undefined) {
      throw new Error(
        'Player authentication view model has not been presented',
      );
    }
    return this._viewModel;
  }
}
