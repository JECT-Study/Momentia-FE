import axios from 'axios';

import ROUTE from '@/constants/routes';
import TokenHandler from '@/utils/tokenHandler';

import postRefreshToken from './auth/postRefreshToken';

const baseURL =
  process.env.NEXT_PUBLIC_USE_MSW == 'true'
    ? process.env.NEXT_PUBLIC_API_MSW_URL
    : process.env.NEXT_PUBLIC_API_BASE_URL;

const defaultClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const authorizedClient = axios.create({
  baseURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

authorizedClient.interceptors.request.use((config) => {
  const token = TokenHandler.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    window.location.href = ROUTE.signIn;
  }

  return config;
});

authorizedClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      const refreshToken = TokenHandler.getRefreshToken();

      if (refreshToken === '') window.location.href = ROUTE.home;
      const newToken = await postRefreshToken(refreshToken);

      TokenHandler.setToken(newToken);

      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken.accessToken}`;
        return authorizedClient(originalRequest);
      }
    }
  },
);

export default defaultClient;
