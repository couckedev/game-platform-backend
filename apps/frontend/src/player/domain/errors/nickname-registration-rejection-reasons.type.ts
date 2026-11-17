const nicknameRegistrationRejectionReasons = ['NICKNAME_ALREADY_TAKEN'] as const;

export type NicknameRegistrationRejectionReason =
  (typeof nicknameRegistrationRejectionReasons)[number];
