import JWT from 'jsonwebtoken';

import { AuthTokenType } from '@/types/auth';

const TokenHandler = {
  setToken({ accessToken, refreshToken }: AuthTokenType) {
    localStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    window.dispatchEvent(new Event('authEvent'));
  },
  getAccessToken() {
    return localStorage.getItem('accessToken') || '';
  },
  getRefreshToken() {
    return sessionStorage.getItem('refreshToken') || '';
  },
  getUserIdFromToken() {
    const token = this.getAccessToken();
    const decodedInfo = JWT.decode(token);

    if (!decodedInfo || typeof decodedInfo === 'string') return 0;

    return decodedInfo.id as number;
  },

  removeToken() {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.dispatchEvent(new Event('authEvent'));
  },
};

export default TokenHandler;
