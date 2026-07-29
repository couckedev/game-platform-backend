import type { PlayerRegistrationViewModel } from '@player/interface-adapters/view-models';
import type { Renderer, View } from '@shared/infrastructure';
import type { HttpPlayerRegistrationResponse } from '../responses';

export class HttpPlayerRegistrationView
  implements View<PlayerRegistrationViewModel>
{
  constructor(
    private readonly renderHttpResponse: Renderer<HttpPlayerRegistrationResponse>,
  ) {}

  render(viewModel: PlayerRegistrationViewModel): void {
    if (viewModel.status === 'SUCCESS') {
      this.renderHttpResponse({
        statusCode: 201,
        body: {},
      });
      return;
    }
    this.renderHttpResponse({
      statusCode: 422,
      body: {
        rejectionReason: 'NICKNAME_TOO_SHORT',
      },
    });
  }
}
