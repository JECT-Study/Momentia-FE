import JWT from 'jsonwebtoken';

import { AuthTokenType } from '@/types/auth';

const TokenHandler = {
  setToken({ accessToken, refreshToken }: AuthTokenType) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
    window.dispatchEvent(new Event('authEvent'));
  },
  getAccessToken() {
    if (typeof window === 'undefined') return '';
    return localStorage.getItem('accessToken') || '';
  },
  getRefreshToken() {
    if (typeof window === 'undefined') return '';
    return sessionStorage.getItem('refreshToken') || '';
  },
  getUserIdFromToken() {
    const token = this.getAccessToken();
    if (!token) return 0;

    try {
      const decodedInfo = JWT.decode(token);
      if (!decodedInfo || typeof decodedInfo === 'string') return 0;

      return decodedInfo.id as number;
    } catch (error) {
      console.error('Token decoding failed:', error);
      return 0;
    }
  },
  removeToken() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.dispatchEvent(new Event('authEvent'));
  },
};

export default TokenHandler;
