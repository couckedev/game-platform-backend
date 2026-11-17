import { FastifyReply } from 'fastify';
import { PlayerAuthenticationViewModel } from '@/player/interface-adapters/authenticate-player';

export class FastifyPlayerAuthenticationView {
  constructor(private readonly httpResponse: FastifyReply) {}

  render(viewModel: PlayerAuthenticationViewModel): void {
    if (viewModel.status === 'NOT_FOUND') {
      this.httpResponse.status(404).send({ message: 'Player not found' });
      return;
    }
    this.httpResponse.status(200).send({ ...viewModel.currentPlayer });
  }
}
