import type { InjectionToken } from '@nestjs/common';
import type { Logger as CommonLogger } from '../../logging/common';

export const Logger = Symbol('Logger') as InjectionToken<CommonLogger>;
