import { createPlayerTestingModule } from '@player/infrastructure/testing';

export function bootstrapAcceptanceTestsApplication() {
  const playerTestingModule = createPlayerTestingModule();

  return { playerTestingModule };
}
