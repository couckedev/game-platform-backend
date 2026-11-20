import type { Translator } from '@/player/interface-adapters/ports';
import { TranslationMappingNotFoundError } from './translation-not-found.error';

export class InMemoryTranslator implements Translator {
  constructor(private readonly translations: Map<string, string>) {}
  translate(translationKey: string): string {
    const translation = this.translations.get(translationKey);
    if (translation === undefined) {
      throw new TranslationMappingNotFoundError(translationKey);
    }
    return translation;
  }
}
