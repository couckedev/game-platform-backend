import { FastifyReply } from 'fastify';
import { PlayerRegistrationViewModel } from '@/player/interface-adapters/register-player/player-registration.view-model';

export class FastifyPlayerRegistrationView {
  constructor(private readonly httpResponse: FastifyReply) {}

  render(viewModel: PlayerRegistrationViewModel): void {
    if (viewModel.status === 'SUCCESS') {
      this.httpResponse.status(201).send({});
      return;
    }
    this.httpResponse.status(422).send({ rejectionReason: 'NICKNAME_TOO_SHORT' });
    return;
  }
}
