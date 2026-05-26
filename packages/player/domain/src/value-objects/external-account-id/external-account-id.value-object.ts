import { EmptyExternalAccountIdError } from "../../errors/empty-account-id.error";

export class ExternalAccountId {
  private constructor(public readonly value: string) {}

  static create(value: string): ExternalAccountId {
    if(!value || value.trim().length === 0) {
        throw new EmptyExternalAccountIdError();
    }
    return new ExternalAccountId(value);
  }

  equals(externalAccountId: ExternalAccountId): boolean {
    return this.value === externalAccountId.value;
  }
}
