import type { PlayerAuthenticationViewModel } from '@player/interface-adapters/view-models';
import type { Renderer, View } from '@shared/infrastructure';
import type { HttpPlayerAuthenticationResponse } from '../responses';

export class HttpPlayerAuthenticationView
  implements View<PlayerAuthenticationViewModel>
{
  constructor(
    private readonly renderHttpResponse: Renderer<HttpPlayerAuthenticationResponse>,
  ) {}

  render(viewModel: PlayerAuthenticationViewModel): void {
    this.renderHttpResponse({
      statusCode: 200,
      body: { nickname: viewModel.nickname },
    });
  }
}
