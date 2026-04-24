import { describe, expect, it } from "vitest";
import { Timestamp } from "shared-time";
import { PlayerId } from "../value-objects/player-id/player-id.value-object";
import { Player } from "./player.aggregate";
import { Nickname } from "../value-objects/nickname/nickname.value-object";

describe('Player aggregate', () => {
    describe('register', () => {
        it('should return new player with nickname', () => {
            const playerId = PlayerId.create('player-id');
            const nickname = Nickname.create('nickname');
            const createdAt = Timestamp.fromISOString("2026-04-15T12:00:00Z");

            const newPlayer = Player.register(playerId, nickname, createdAt);

            expect(newPlayer.playerId).toStrictEqual(playerId);
            expect(newPlayer.nickname).toStrictEqual(nickname);
            expect(newPlayer.createdAt).toStrictEqual(createdAt);
        })
    });

    describe('rehydrate', () => {
        it('should return player from existing data', () => {
            const playerId = PlayerId.create('player-id');
            const nickname = Nickname.create('nickname');
            const createdAt = Timestamp.fromISOString("2026-04-15T12:00:00Z");

            const newPlayer = Player.rehydrate(playerId, nickname, createdAt);

            expect(newPlayer.playerId).toStrictEqual(playerId);
            expect(newPlayer.nickname).toStrictEqual(nickname);
            expect(newPlayer.createdAt).toStrictEqual(createdAt);
        })
    });

    describe('aggregateId', () => {
        it('should return player id value', () => {
            const playerId = PlayerId.create('player-id');
            const nickname = Nickname.create('nickname');
            const createdAt = Timestamp.fromISOString("2026-04-15T12:00:00Z");

            const player = Player.register(playerId, nickname, createdAt);

            expect(player.aggregateId).toStrictEqual(playerId.value);
        })
    });
    
    describe('aggregateType', () => {
        it('should return "player"', () => {
            const playerId = PlayerId.create('player-id');
            const nickname = Nickname.create('nickname');
            const createdAt = Timestamp.fromISOString("2026-04-15T12:00:00Z");

            const player = Player.register(playerId, nickname, createdAt);

            expect(player.aggregateType).toStrictEqual('player');
        })
    })
})