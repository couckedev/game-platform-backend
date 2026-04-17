import type {
  ExternalAccountLink,
  ExternalAccountLinkRepositoryPort,
  ExternalAccountId,
} from "player-domain";

export class InMemoryExternalAccountLinkRepository implements ExternalAccountLinkRepositoryPort {
  private readonly store = new Map<string, ExternalAccountLink>();

  async load(
    externalAccountId: ExternalAccountId,
  ): Promise<ExternalAccountLink | null> {
    const link = this.store.get(externalAccountId.value);
    if (!link) {
      return null;
    }
    return link;
  }

  async save(externalAccountLink: ExternalAccountLink): Promise<void> {
    this.store.set(
      externalAccountLink.externalAccountId.value,
      externalAccountLink,
    );
  }
}
