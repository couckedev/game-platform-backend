export class TranslationMappingNotFoundError extends Error {
  constructor(translationKey: string) {
    super(`Translation not found for key ${translationKey}`);
  }
}
