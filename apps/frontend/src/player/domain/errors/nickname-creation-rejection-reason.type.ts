const nicknameCreationRejectionReasons = [
  'NICKNAME_TOO_SHORT',
  'NICKNAME_TOO_LONG',
  'NICKNAME_CONTAINS_FORBIDDEN_CHARACTERS',
] as const;

export type NicknameCreationRejectionReason = (typeof nicknameCreationRejectionReasons)[number];
