import { USER } from '@/constants/API';
import { delay } from 'msw';

import { http, HttpResponse } from 'msw';

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),

  http.get(USER.validateEmail, () => {
    return HttpResponse.json(null, {
      status: 204,
    });
  }),

  http.post(USER.login, async ({ request }) => {
    return HttpResponse.json(
      {
        accessToken: '172fjdhkfjkjh38913',
        refreshToken: '172fjdhkfjkjh38913',
      },
      { status: 200 },
    );
  }),

  http.post(USER.signup, async ({ request }) => {
    return HttpResponse.json(
      {
        accessToken: '172fjdhkfjkjh38913',
        refreshToken: '172fjdhkfjkjh38913',
      },
      { status: 201 },
    );
  }),

  http.get(`${USER.socialLogin}/:provider`, () => {
    return HttpResponse.json(
      {
        isRegistered: true,
        token: {
          accessToken: '172fjdhkfjkjh38913',
          refreshToken: '172fjdhkfjkjh38913',
        },
      },
      {
        status: 200,
      },
    );
  }),

  http.get(USER.validateEmail, () => {
    return HttpResponse.json(
      {
        isValid: true,
        menssage: '',
      },
      {
        status: 200,
      },
    );
  }),
];
