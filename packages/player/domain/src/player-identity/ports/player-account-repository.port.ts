import type { PlayerAccount } from "../aggregates/player-account/player-account.aggregate";
import type { PlayerId } from "../value-objects/player-id.value-object";

export interface PlayerAccountRepositoryPort {
    save(playerAccount: PlayerAccount): Promise<void>;
    load(playerId: PlayerId): Promise<PlayerAccount | null>;
}