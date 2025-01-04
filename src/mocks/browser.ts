import { setupWorker } from 'msw/browser';

import { artworkHandlers } from './artworkHandlers';
import { handlers } from './handlers';

export const worker = setupWorker(...handlers, ...artworkHandlers);
