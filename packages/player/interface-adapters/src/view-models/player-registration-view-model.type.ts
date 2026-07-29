export type PlayerRegistrationViewModel =
  | {
      status: 'SUCCESS';
    }
  | { status: 'FAILURE'; rejectionReason: 'NICKNAME_TOO_SHORT' };
