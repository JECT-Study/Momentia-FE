import { ARTWORK } from '@/constants/API';

import { ArtworkInfoType, ArtworkListResponse } from '@/types';

import { http, HttpResponse } from 'msw';

interface FollowedArtist {
  userId: number;
  nickname: string;
  userImage: string | null;
  userField: string | null;
  isFollow: boolean;
  posts: (Omit<ArtworkInfoType, 'userId' | 'nickname'> & {
    createdTime: string;
  })[];
}

interface FollowedArtistsResponse {
  posts: FollowedArtist[];
}

export const artworkHandlers = [
  http.get(ARTWORK.followedArtists, () => {
    const responseData: FollowedArtistsResponse = {
      posts: [
        {
          userId: 1,
          nickname: '닉네임1',
          userImage: '/images/defaultArtworkImage.png',
          userField: 'PAINTING',
          isFollow: false,
          posts: [
            {
              postId: 1,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 23,
              likeCount: 2,
              commentCount: 5,
              isLiked: true,
              createdTime: '2024-12-27T13:02:53',
            },
            {
              postId: 2,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 22,
              likeCount: 3,
              commentCount: 1,
              isLiked: false,
              createdTime: '2024-12-27T13:02:53',
            },
          ],
        },
        {
          userId: 2,
          nickname: '닉네임2',
          userImage: null,
          userField: null,
          isFollow: true,
          posts: [
            {
              postId: 3,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 72,
              likeCount: 33,
              commentCount: 4,
              isLiked: false,
              createdTime: '2024-12-27T13:02:53',
            },
            {
              postId: 4,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 53,
              likeCount: 23,
              commentCount: 1,
              isLiked: true,
              createdTime: '2024-12-27T13:02:53',
            },
          ],
        },
        {
          userId: 3,
          nickname: '닉네임3',
          userImage: null,
          userField: null,
          isFollow: true,
          posts: [
            {
              postId: 3,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 23,
              likeCount: 2,
              commentCount: 6,
              isLiked: false,
              createdTime: '2024-12-27T13:02:53',
            },
          ],
        },
        {
          userId: 4,
          nickname: '닉네임4',
          userImage: null,
          userField: null,
          isFollow: true,
          posts: [
            {
              postId: 5,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 23,
              likeCount: 2,
              commentCount: 6,
              isLiked: false,
              createdTime: '2024-12-27T13:02:53',
            },
          ],
        },
        {
          userId: 5,
          nickname: '닉네임5',
          userImage: null,
          userField: null,
          isFollow: true,
          posts: [
            {
              postId: 5,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 23,
              likeCount: 2,
              commentCount: 6,
              isLiked: false,
              createdTime: '2024-12-27T13:02:53',
            },
          ],
        },
      ],
    };

    return HttpResponse.json(responseData, { status: 200 });
  }),

  http.get(ARTWORK.artworkList, ({ request }) => {
    const mockArtworkData = [
      {
        postId: 1,
        title: '푸른 바다',
        postImage: '/images/defaultArtworkImage.png',
        userId: 1,
        nickname: '김화백',
        artworkField: 'PAINTING',
        viewCount: 1020,
        likeCount: 540,
        commentCount: 15,
        isLiked: true,
        createdTime: '2024-12-25T10:00:00',
      },
      {
        postId: 2,
        title: '붉은 노을',
        postImage: '/images/defaultArtworkImage.png',
        userId: 2,
        nickname: '이작가',
        artworkField: 'DRAWING',
        viewCount: 890,
        likeCount: 460,
        commentCount: 12,
        isLiked: false,
        createdTime: '2024-12-26T12:00:00',
      },
      {
        postId: 3,
        title: '숲 속의 고요',
        postImage: '/images/defaultArtworkImage.png',
        userId: 3,
        nickname: '박디자이너',
        artworkField: 'CRAFTSCULPTURE',
        viewCount: 1500,
        likeCount: 720,
        commentCount: 25,
        isLiked: true,
        createdTime: '2024-12-27T09:00:00',
      },
      {
        postId: 4,
        title: '겨울 산책',
        postImage: '/images/defaultArtworkImage.png',
        userId: 4,
        nickname: '최화가',
        artworkField: 'PAINTING',
        viewCount: 640,
        likeCount: 300,
        commentCount: 8,
        isLiked: false,
        createdTime: '2024-12-28T14:00:00',
      },
      {
        postId: 5,
        title: '우주의 신비',
        postImage: '/images/defaultArtworkImage.png',
        userId: 5,
        nickname: '정예술가',
        artworkField: 'DIGITALART',
        viewCount: 2200,
        likeCount: 1200,
        commentCount: 50,
        isLiked: true,
        createdTime: '2024-12-29T16:00:00',
      },
      {
        postId: 4234,
        title: '푸른 바다',
        postImage: '/images/defaultArtworkImage.png',
        userId: 1231243,
        nickname: '김화백',
        artworkField: 'PAINTING',
        viewCount: 1020,
        likeCount: 540,
        commentCount: 15,
        isLiked: true,
        createdTime: '2024-12-25T10:00:00',
      },
      {
        postId: 2342342314,
        title: '붉은 노을',
        postImage: '/images/defaultArtworkImage.png',
        userId: 12413123,
        nickname: '이작가',
        artworkField: 'DRAWING',
        viewCount: 890,
        likeCount: 460,
        commentCount: 12,
        isLiked: false,
        createdTime: '2024-12-26T12:00:00',
      },
      {
        postId: 12312413,
        title: '숲 속의 고요',
        postImage: '/images/defaultArtworkImage.png',
        userId: 23412414,
        nickname: '박디자이너',
        artworkField: 'CRAFTSCULPTURE',
        viewCount: 1500,
        likeCount: 720,
        commentCount: 25,
        isLiked: true,
        createdTime: '2024-12-27T09:00:00',
      },
      {
        postId: 1241254141,
        title: '겨울 산책',
        postImage: '/images/defaultArtworkImage.png',
        userId: 31543,
        nickname: '최화가',
        artworkField: 'PAINTING',
        viewCount: 640,
        likeCount: 300,
        commentCount: 8,
        isLiked: false,
        createdTime: '2024-12-28T14:00:00',
      },
      {
        postId: 7565,
        title: '우주의 신비',
        postImage: '/images/defaultArtworkImage.png',
        userId: 3463463,
        nickname: '정예술가',
        artworkField: 'DIGITALART',
        viewCount: 2200,
        likeCount: 1200,
        commentCount: 50,
        isLiked: true,
        createdTime: '2024-12-29T16:00:00',
      },
      {
        postId: 1242,
        title: '푸른 바다',
        postImage: '/images/defaultArtworkImage.png',
        userId: 325465,
        nickname: '김화백',
        artworkField: 'PAINTING',
        viewCount: 1020,
        likeCount: 540,
        commentCount: 15,
        isLiked: true,
        createdTime: '2024-12-25T10:00:00',
      },
      {
        postId: 4255,
        title: '붉은 노을',
        postImage: '/images/defaultArtworkImage.png',
        userId: 5724,
        nickname: '이작가',
        artworkField: 'DRAWING',
        viewCount: 890,
        likeCount: 460,
        commentCount: 12,
        isLiked: false,
        createdTime: '2024-12-26T12:00:00',
      },
      {
        postId: 6543,
        title: '숲 속의 고요',
        postImage: '/images/defaultArtworkImage.png',
        userId: 2352,
        nickname: '박디자이너',
        artworkField: 'CRAFTSCULPTURE',
        viewCount: 1500,
        likeCount: 720,
        commentCount: 25,
        isLiked: true,
        createdTime: '2024-12-27T09:00:00',
      },
      {
        postId: 6854,
        title: '겨울 산책',
        postImage: '/images/defaultArtworkImage.png',
        userId: 653442,
        nickname: '최화가',
        artworkField: 'PAINTING',
        viewCount: 640,
        likeCount: 300,
        commentCount: 8,
        isLiked: false,
        createdTime: '2024-12-28T14:00:00',
      },
      {
        postId: 12323,
        title: '우주의 신비',
        postImage: '/images/defaultArtworkImage.png',
        userId: 52624,
        nickname: '정예술가',
        artworkField: 'DIGITALART',
        viewCount: 2200,
        likeCount: 1200,
        commentCount: 50,
        isLiked: true,
        createdTime: '2024-12-29T16:00:00',
      },
      {
        postId: 1353,
        title: '푸른 바다',
        postImage: '/images/defaultArtworkImage.png',
        userId: 143631,
        nickname: '김화백',
        artworkField: 'PAINTING',
        viewCount: 1020,
        likeCount: 540,
        commentCount: 15,
        isLiked: true,
        createdTime: '2024-12-25T10:00:00',
      },
      {
        postId: 123512,
        title: '붉은 노을',
        postImage: '/images/defaultArtworkImage.png',
        userId: 12363451,
        nickname: '이작가',
        artworkField: 'DRAWING',
        viewCount: 890,
        likeCount: 460,
        commentCount: 12,
        isLiked: false,
        createdTime: '2024-12-26T12:00:00',
      },
      {
        postId: 122,
        title: '숲 속의 고요',
        postImage: '/images/defaultArtworkImage.png',
        userId: 46346,
        nickname: '박디자이너',
        artworkField: 'CRAFTSCULPTURE',
        viewCount: 1500,
        likeCount: 720,
        commentCount: 25,
        isLiked: true,
        createdTime: '2024-12-27T09:00:00',
      },
      {
        postId: 123,
        title: '겨울 산책',
        postImage: '/images/defaultArtworkImage.png',
        userId: 3464135,
        nickname: '최화가',
        artworkField: 'PAINTING',
        viewCount: 640,
        likeCount: 300,
        commentCount: 8,
        isLiked: false,
        createdTime: '2024-12-28T14:00:00',
      },
      {
        postId: 1123,
        title: '우주의 신비',
        postImage: '/images/defaultArtworkImage.png',
        userId: 1261345,
        nickname: '정예술가',
        artworkField: 'DIGITALART',
        viewCount: 2200,
        likeCount: 1200,
        commentCount: 50,
        isLiked: true,
        createdTime: '2024-12-29T16:00:00',
      },
    ];

    const url = new URL(request.url);
    const search = url.searchParams.get('search') || '';
    const sort = url.searchParams.get('sort') || 'recent';
    const artworkField = url.searchParams.get('artworkField');

    const filteredData = mockArtworkData
      .filter((artwork) => {
        if (!artworkField)
          return (
            artwork.title.includes(search) || artwork.nickname.includes(search)
          );

        return (
          artwork.artworkField === artworkField &&
          (artwork.title.includes(search) || artwork.nickname.includes(search))
        );
      })
      .sort((a, b) => {
        switch (sort) {
          case 'popular':
            return b.likeCount - a.likeCount;
          case 'view':
            return b.viewCount - a.viewCount;
          case 'recent':
          default:
            return (
              new Date(b.createdTime).getTime() -
              new Date(a.createdTime).getTime()
            );
        }
      });

    const page = parseInt(url.searchParams.get('page') || '0', 10);
    const size = parseInt(url.searchParams.get('size') || '12', 10);

    const paginatedData = filteredData.slice(page * size, (page + 1) * size);

    const responseData: ArtworkListResponse = {
      data: paginatedData,
      page: {
        totalDataCnt: filteredData.length,
        totalPages: Math.ceil(filteredData.length / size),
        isLastPage: page >= Math.ceil(filteredData.length / size) - 1,
        isFirstPage: page === 0,
        requestPage: page,
        requestSize: size,
      },
    };

    return HttpResponse.json(responseData, { status: 200 });
  }),
];
