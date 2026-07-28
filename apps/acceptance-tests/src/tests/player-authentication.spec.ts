import { beforeAll, describe, expect, it } from 'vitest';
import { bootstrapAcceptanceTestsApplication } from '../bootstrap-acceptance-tests-application';

describe('Player authentication', () => {
  beforeAll(() => {
    const bootstrap = bootstrapAcceptanceTestsApplication();
  });

  it('authenticates an existing player', async () => {
    expect(0).toStrictEqual(12);
  });
});
