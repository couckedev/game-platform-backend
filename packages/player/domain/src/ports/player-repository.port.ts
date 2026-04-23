import type { Player } from "../aggregates/player.aggregate";
import type { PlayerId } from "../value-objects/player-id/player-id.value-object";

export interface PlayerRepositoryPort {
    save(player: Player): Promise<void>;
    load(playerId: PlayerId): Promise<Player | null>;
}