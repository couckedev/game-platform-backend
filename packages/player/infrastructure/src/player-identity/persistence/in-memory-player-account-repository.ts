import {
  type Nickname,
  PlayerAccount,
  type PlayerAccountDomainEvent,
  type PlayerAccountRepositoryPort,
} from "player-domain";
import type { StreamEvent } from "@couckedev/ddd-core";

export class InMemoryPlayerAccountRepository implements PlayerAccountRepositoryPort {
  private readonly eventstore = new Map<
    string,
    StreamEvent<PlayerAccountDomainEvent>[]
  >();

  async load(nickname: Nickname): Promise<PlayerAccount | null> {
    const history = this.eventstore.get(nickname.value);
    if (!history?.length) {
      return null;
    }
    return new PlayerAccount(nickname).rehydrate(history);
  }

  async save(payerAccount: PlayerAccount): Promise<void> {
    const streamId = payerAccount.aggregateId;
    const history = this.eventstore.get(streamId) ?? [];
    let revision = payerAccount.currentRevision;

    for (const event of payerAccount.getUncommittedEvents()) {
      history.push({ revision: ++revision, event });
    }

    this.eventstore.set(streamId, history);
    payerAccount.commitEvents();
  }
}
