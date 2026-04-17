import {
  type Nickname,
  NicknameClaim,
  type NicknameClaimDomainEvent,
  type NicknameClaimRepositoryPort,
} from "player-domain";
import type { StreamEvent } from "@couckedev/ddd-core";

export class InMemoryNicknameClaimRepository implements NicknameClaimRepositoryPort {
  private readonly eventstore = new Map<
    string,
    StreamEvent<NicknameClaimDomainEvent>[]
  >();

  async load(nickname: Nickname): Promise<NicknameClaim | null> {
    const history = this.eventstore.get(nickname.value);
    if (!history?.length) {
      return null;
    }
    return new NicknameClaim(nickname).rehydrate(history);
  }

  async save(nicknameClaim: NicknameClaim): Promise<void> {
    const streamId = nicknameClaim.aggregateId;
    const history = this.eventstore.get(streamId) ?? [];
    let revision = nicknameClaim.currentRevision;

    for (const event of nicknameClaim.getUncommittedEvents()) {
      history.push({ revision: ++revision, event });
    }

    this.eventstore.set(streamId, history);
    nicknameClaim.commitEvents();
  }
}
