import { PlayerId } from "player-domain";

export class PlayerIdAlreadyUsedError extends Error {
    constructor(playerId: PlayerId) {
        super(`Player id ${playerId.value} is already used by another player`);
    }
}