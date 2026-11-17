export type PlayerRegistrationViewModel =
  | { status: 'SUCCESS' }
  | { status: 'FAILURE'; reason: 'NICKNAME_TOO_SHORT' };
