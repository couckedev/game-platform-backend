import type { ExternalAccountLink } from "../aggregates/external-account-link/external-account-link.aggregate";
import type { ExternalAccountId } from "../value-objects/external-account-id.value-object";

export interface ExternalAccountLinkRepositoryPort {
    save(externalAccountLink: ExternalAccountLink): Promise<void>;
    load(externalAccountId: ExternalAccountId): Promise<ExternalAccountLink | null>;
}