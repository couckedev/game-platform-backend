import { AbstractEventSourcedAggregate } from "@couckedev/ddd-core";
import type { PlayerAccountDomainEvent } from "../../events/player-account/player-account-domain-event.type";
import type { PlayerId } from "../../value-objects/player-id.value-object";
import { PlayerAccountStatus } from "../../enums/player-account-status.enum";
import { PlayerAccountCreatedEvent } from "../../events/player-account/player-account-created.domain-event";

export class PlayerAccount extends AbstractEventSourcedAggregate<PlayerAccountDomainEvent> {
    private status: PlayerAccountStatus | null = null;

    constructor(public readonly playerId: PlayerId) {
        super();
    }

    static create(playerId: PlayerId, createdAt: Temporal.Instant): PlayerAccount {
        const playerAccount = new PlayerAccount(playerId);
        const playerAccountCreatedEvent = new PlayerAccountCreatedEvent(playerId, createdAt);
        playerAccount.recordEvent(playerAccountCreatedEvent);
        return playerAccount;
    }

    private onCreated(): void {
        this.status = PlayerAccountStatus.Active;
    }

    protected override applyEvent<Event extends PlayerAccountDomainEvent>(event: Event): void {
        if(event instanceof PlayerAccountCreatedEvent) {
            return this.onCreated();
        }
    }

    override get aggregateId(): string {
        return this.playerId.value;
    }

    override get aggregateType(): string {
        return 'player-account';
    }

    isActive(): boolean {
        return this.status === PlayerAccountStatus.Active
    }
}