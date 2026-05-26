import {
  ExternalAccountId,
  type PlayerRepositoryPort,
} from "player-domain";
import type { GetPlayerOutput } from "./get-player.output";

export class GetPlayerUseCase {
  constructor(
    private readonly playerRepository: PlayerRepositoryPort,
  ) {}

  async execute(externalAccountId: string): Promise<GetPlayerOutput | null> {
    const player = await this.playerRepository.findByExternalAccountId(
      ExternalAccountId.create(externalAccountId),
    );

    if (!player) {
      return null;
    }

    await this.playerRepository.markAsOnline(player.playerId);

    return {
      playerId: player.playerId.value,
      nickname: player.nickname.value,
      createdAt: player.createdAt.value,
      isOnline: true,
    };
  }
}
