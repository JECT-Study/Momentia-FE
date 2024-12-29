import { setupServer } from 'msw/node';

import { artworkHandlers } from './artworkHandlers';
import { handlers } from './handlers'; // 요청 핸들러 정의 파일 (필요 시 경로 수정)

export const server = setupServer(...handlers, ...artworkHandlers);
