import type { AuthenticatedIdentity } from '../../authentication/common';

export type HttpAuthenticatedRequest = {
  authenticatedIdentity: AuthenticatedIdentity;
};
