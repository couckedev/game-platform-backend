import type { Player } from "../aggregates/player.aggregate";
import type { PlayerId } from "../value-objects/player-id/player-id.value-object";
import type { ExternalAccountId } from "../value-objects/external-account-id/external-account-id.value-object";

export interface PlayerRepositoryPort {
    save(player: Player): Promise<void>;
    load(playerId: PlayerId): Promise<Player | null>;
    findByExternalAccountId(externalAccountId: ExternalAccountId): Promise<Player | null>;
    markAsOnline(playerId: PlayerId): Promise<void>;
}