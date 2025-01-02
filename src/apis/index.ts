import axios from 'axios';

const defaultClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const authorizedClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_MSW_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default defaultClient;
