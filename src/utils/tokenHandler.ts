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

  removeToken() {
    localStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    window.dispatchEvent(new Event('authEvent'));
  },
};

export default TokenHandler;
