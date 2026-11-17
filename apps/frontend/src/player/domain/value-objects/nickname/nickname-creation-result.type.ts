import type { NicknameCreationRejectionReason } from '../../errors';
import type { Nickname } from './nickname-value-object';

export type NicknameCreationResult =
  | { status: 'SUCCESS'; value: Nickname }
  | { status: 'FAILURE'; errors: NicknameCreationRejectionReason[] };
