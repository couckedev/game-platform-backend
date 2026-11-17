import type {
  AuthenticatePlayerOutput,
  AuthenticatePlayerOutputData,
} from '@/player/application/features/authenticate-player';
import type { PlayerAuthenticationViewModel } from './player-authentication.view-model';

export class AuthenticatePlayerPresenter implements AuthenticatePlayerOutput {
  private _viewModel: PlayerAuthenticationViewModel | null = null;

  present(outputData: AuthenticatePlayerOutputData): void {
    if (outputData.status === 'NOT_FOUND') {
      this._viewModel = { status: 'NOT_FOUND' };
      return;
    }
    this._viewModel = {
      status: 'FOUND',
      authenticatedPlayer: {
        nickname: outputData.authenticatedPlayer.nickname,
      },
    };
    return;
  }

  requireViewModel(): PlayerAuthenticationViewModel {
    if (this._viewModel === null) {
      throw new Error('Player authentication view model has not been presented');
    }
    return this._viewModel;
  }
}
