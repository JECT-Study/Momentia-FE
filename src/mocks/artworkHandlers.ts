import { http, HttpResponse } from 'msw';

interface Pagination {
  totalDataCnt: number;
  totalPages: number;
  isLastPage: boolean;
  isFirstPage: boolean;
  requestPage: number;
  requestSize: number;
}

interface Artwork {
  postId: number;
  postImage: string;
  title: string;
  userId: number;
  nickname: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

export interface FollowedArtist {
  userId: number;
  nickname: string;
  userImage: string | null;
  userField: string | null;
  isFollow: boolean;
  posts: (Omit<Artwork, 'userId' | 'nickname' | 'artworkField'> & {
    createdTime: string;
  })[];
}

interface ArtworkResponse {
  data: Artwork[];
  page: Pagination;
}

export interface FollowedArtistsResponse {
  posts: FollowedArtist[];
}

export const artworkHandlers = [
  http.get('/artwork/followingUsers/posts', () => {
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

  http.get('/artwork/posts', ({ request }) => {
    const url = new URL(request.url);

    const search = url.searchParams.get('search') || '';
    const sort = url.searchParams.get('sort') || 'recent';

    const mockArtworkData = [
      {
        postId: 1,
        title: '푸른 바다',
        postImage: '/images/defaultArtworkImage.png',
        userId: 1,
        nickname: '김화백',
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
        viewCount: 2200,
        likeCount: 1200,
        commentCount: 50,
        isLiked: true,
        createdTime: '2024-12-29T16:00:00',
      },
    ];

    const filteredData = mockArtworkData.filter(
      (artwork) =>
        artwork.title.includes(search) || artwork.nickname.includes(search),
    );

    const sortedData = filteredData.sort((a, b) => {
      if (sort === 'popular') {
        return b.likeCount - a.likeCount;
      } else if (sort === 'view') {
        return b.viewCount - a.viewCount;
      } else if (sort === 'recent') {
        return (
          new Date(b.createdTime).getTime() - new Date(a.createdTime).getTime()
        );
      }
      return 0;
    });

    const responseData: ArtworkResponse = {
      data: sortedData,
      page: {
        totalDataCnt: sortedData.length,
        totalPages: Math.ceil(sortedData.length / 12),
        isLastPage: sortedData.length <= 12,
        isFirstPage: true,
        requestPage: 1,
        requestSize: 12,
      },
    };

    return HttpResponse.json(responseData, { status: 200 });
  }),
];
