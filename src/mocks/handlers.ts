import { MONTHLY, USER } from '@/constants/API';

import { delay, http, HttpResponse } from 'msw';

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),

  http.get(USER.validateEmail, () => {
    return HttpResponse.json(null, {
      status: 204,
    });
  }),

  http.post(USER.signIn, ({ request }) => {
    return HttpResponse.json(
      {
        accessToken: '172fjdhkfjkjh38913',
        refreshToken: '172fjdhkfjkjh38913',
      },
      { status: 200 },
    );
  }),

  http.post(USER.signIn, ({ request }) => {
    return HttpResponse.json(
      {
        accessToken: '172fjdhkfjkjh38913',
        refreshToken: '172fjdhkfjkjh38913',
      },
      { status: 201 },
    );
  }),

  http.get(`${USER.socialSignIn}/:provider`, () => {
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
      {},
      {
        status: 200,
        headers: {},
      },
    );
  }),

  http.get(MONTHLY.artistOfTheMonth, ({ request }) => {
    return HttpResponse.json(
      {
        users: [
          {
            userId: 1,
            profileImage: '',
            nickname: '닉네임1',
            userField: '작업분야',
            introduction: '한줄소개',
            isFollow: false,
            artworkImage: '',
            rank: 5,
          },
          {
            userId: 2,
            profileImage: '',
            nickname: '닉네임2',
            userField: '작업분야',
            introduction: '두줄 소개입니다',
            isFollow: true,
            artworkImage: '',
            rank: 5,
          },
          {
            userId: 3,
            profileImage: '',
            nickname: '닉네임33',
            userField: '작업분야',
            introduction: '한줄소개',
            isFollow: true,
            artworkImage: '',
            rank: 5,
          },
          {
            userId: 4,
            profileImage: '',
            nickname: '닉네afsdfasddd임1',
            userField: '작업분야',
            introduction: '한줄소개',
            isFollow: true,
            artworkImage: '',
            rank: 5,
          },
          {
            userId: 5,
            profileImage: '',
            nickname: '닉dddd네임1',
            userField: '작업분야',
            introduction: '한줄소개',
            isFollow: true,
            artworkImage: '',
            rank: 5,
          },
        ],
      },
      { status: 200 },
    );
  }),

  http.get(MONTHLY.popularArtwork, () => {
    return HttpResponse.json(
      {
        posts: [
          {
            postId: 1,
            title: '제목1',
            postImage: '',
            userId: 1,
            nickname: '작가1',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: false,
          },
          {
            postId: 2,
            title: '제목2',
            postImage: '',
            userId: 1,
            nickname: '작가2',
            viewCount: 8030,
            likeCount: 2322,
            commentCount: 2330,
            isLiked: true,
          },
          {
            postId: 3,
            title: '제목3',
            postImage: '',
            userId: 1,
            nickname: '작가1',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: true,
          },
          {
            postId: 4,
            title: '제목4',
            postImage: '',
            userId: 4,
            nickname: '작가4',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: false,
          },
          {
            postId: 33,
            title: '제목5',
            postImage: '',
            userId: 13,
            nickname: '작가13',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: false,
          },
          {
            postId: 123,
            title: '제목14',
            postImage: '',
            userId: 14,
            nickname: '작가14',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: true,
          },
          {
            postId: 1233,
            title: '제목15',
            postImage: '',
            userId: 15,
            nickname: '작가15',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: true,
          },
          {
            postId: 222,
            title: '제목123',
            postImage: '',
            userId: 15,
            nickname: '작가15',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: false,
          },
          {
            postId: 1232,
            title: '제목1',
            postImage: '',
            userId: 15,
            nickname: '작가15',
            viewCount: 800,
            likeCount: 232,
            commentCount: 20,
            isLiked: true,
          },
        ],
      },
      { status: 200 },
    );
  }),
];
