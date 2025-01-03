const TokenHandler = {
  setToken({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    localStorage.setItem('accessToken', accessToken);
    sessionStorage.setItem('refreshToken', refreshToken);
  },
  getAccessToken() {
    return localStorage.getItem('accessToken') || '';
  },
  getRefreshToken() {
    return sessionStorage.getItem('refreshToken') || '';
  },
};

export default TokenHandler;
