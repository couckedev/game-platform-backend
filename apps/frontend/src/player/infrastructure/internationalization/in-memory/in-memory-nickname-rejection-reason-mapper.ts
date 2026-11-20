import type { NicknameCreationRejectionReason } from '@/player/domain/value-objects/nickname';
import type { NicknameRejectionReasonMapperPort } from '@/player/interface-adapters/ports';
import { TranslationKeyMappingNotFoundError } from './translation-key-not-found.error';

export class InMemoryNicknameRejectionReasonMapper implements NicknameRejectionReasonMapperPort {
  private _mapping = new Map<NicknameCreationRejectionReason, string>([
    ['NICKNAME_TOO_SHORT', 'Nickname is too short'],
    ['NICKNAME_TOO_LONG', 'Nickname is too long'],
    ['NICKNAME_FORBIDDEN_CHARACTERS', 'Nickname contains forbidden characters'],
    ['NICKNAME_TOO_FEW_ALPHANUMERIC', 'Nickname contains too few alphanumeric characters'],
  ]);

  map(nicknameRejectionReason: NicknameCreationRejectionReason): string {
    const found = this._mapping.get(nicknameRejectionReason);
    if (found === undefined) {
      throw new TranslationKeyMappingNotFoundError(nicknameRejectionReason);
    }
    return found;
  }
}
