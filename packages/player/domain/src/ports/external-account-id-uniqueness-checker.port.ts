import type { ExternalAccountId } from "../value-objects/external-account-id/external-account-id.value-object";

export interface ExternalAccountIdUniquenessCheckerPort {
    isUnique(externalAccountId: ExternalAccountId): Promise<boolean>;
}
