import 'vue-i18n';
import type { MessageSchema } from './message-schema.type';

declare module 'vue-i18n' {
  export interface DefineLocaleMessage extends MessageSchema {}
}
