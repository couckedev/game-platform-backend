const nicknameCreationRejectionReasons = [
  'NICKNAME_TOO_SHORT',
  'NICKNAME_TOO_LONG',
  'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS',
  'NICKNAME_TOO_FEW_LETTERS',
] as const;

export type NicknameCreationRejectionReason = (typeof nicknameCreationRejectionReasons)[number];
