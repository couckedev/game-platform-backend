import { AbstractEventSourcedAggregate } from "@couckedev/ddd-core";
import type { NicknameClaimDomainEvent } from "../../events/nickname-claim/nickname-claim-domain-event.type";
import type { Nickname } from "../../value-objects/nickname/nickname.value-object";
import { NicknameClaimedEvent } from "../../events/nickname-claim/nickname-claimed.domain-event";
import { NicknameClaimStatus } from "../../enums/nickname-claim-status.enum";
import type { PlayerId } from "../../../player-identity/";

export class NicknameClaim extends AbstractEventSourcedAggregate<NicknameClaimDomainEvent> {
    private status: NicknameClaimStatus = NicknameClaimStatus.Available;
    private claimedAt: Temporal.Instant | null = null;
    private claimedBy: PlayerId |null = null;

    constructor(public readonly nickname: Nickname) {
        super();
    }

    claim(claimedBy: PlayerId, claimedAt: Temporal.Instant): void {
        const nicknameClaimedEvent = new NicknameClaimedEvent(this.nickname, claimedBy, claimedAt);
        this.recordEvent(nicknameClaimedEvent);
    }

    private onClaimed(event: NicknameClaimedEvent): void {
        this.status = NicknameClaimStatus.Claimed;
        this.claimedAt = event.claimedAt;
        this.claimedBy = event.claimedBy;
    }

    protected override applyEvent<Event extends NicknameClaimDomainEvent>(event: Event): void {
        if(event instanceof NicknameClaimedEvent) {
            return this.onClaimed(event);
        }
    }

    isReserved(): boolean {
        return this.status === NicknameClaimStatus.Claimed;
    }

    override get aggregateId(): string {
        return this.nickname.value;
    }

    override get aggregateType(): string {
        return 'nickname-claim';
    }
}