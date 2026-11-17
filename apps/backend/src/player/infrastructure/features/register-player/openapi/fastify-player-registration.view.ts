import { FastifyReply } from 'fastify';
import { PlayerRegistrationViewModel } from '@/player/interface-adapters/register-player/player-registration.view-model';

export class FastifyPlayerRegistrationView {
  constructor(private readonly httpResponse: FastifyReply) {}

  render(viewModel: PlayerRegistrationViewModel): void {
    if (viewModel.status === 'SUCCESS') {
      this.httpResponse.status(201).send({});
      return;
    }
    if (viewModel.reason === 'NICKNAME_ALREADY_TAKEN') {
      this.httpResponse.status(409).send({ rejectionReason: viewModel.reason });
      return;
    }
    this.httpResponse.status(422).send({ rejectionReason: viewModel.reason });
    return;
  }
}
