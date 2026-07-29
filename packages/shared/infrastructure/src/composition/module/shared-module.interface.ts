import type { HttpResponse } from '../../http';
import type { Logger } from '../../logging/common';
import type { Renderer } from '../../rendering/common';

export interface SharedModule {
  logger: Logger;
}
