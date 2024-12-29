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
  artworkField: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
}

interface FollowedArtist {
  userId: number;
  nickname: string;
  userImage: string | null;
  userField: string | null;
  isFollow: boolean;
  posts: Omit<Artwork, 'userId' | 'nickname' | 'artworkField'>[];
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
            },
            {
              postId: 2,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 22,
              likeCount: 3,
              commentCount: 1,
              isLiked: false,
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
            },
            {
              postId: 4,
              postImage: '/images/defaultArtworkImage.png',
              title: '작품 제목',
              viewCount: 53,
              likeCount: 23,
              commentCount: 1,
              isLiked: true,
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
            },
          ],
        },
        // {
        //   userId: 4,
        //   nickname: '닉네임4',
        //   userImage: null,
        //   userField: null,
        //   isFollow: true,
        //   posts: [
        //     {
        //       postId: 5,
        //       postImage: '/images/defaultArtworkImage.png',
        //       title: '작품 제목',
        //       viewCount: 23,
        //       likeCount: 2,
        //       commentCount: 6,
        //       isLiked: false,
        //     },
        //   ],
        // },
        // {
        //   userId: 5,
        //   nickname: '닉네임5',
        //   userImage: null,
        //   userField: null,
        //   isFollow: true,
        //   posts: [
        //     {
        //       postId: 5,
        //       postImage: '/images/defaultArtworkImage.png',
        //       title: '작품 제목',
        //       viewCount: 23,
        //       likeCount: 2,
        //       commentCount: 6,
        //       isLiked: false,
        //     },
        //   ],
        // },
      ],
    };

    return HttpResponse.json(responseData, { status: 200 });
  }),

  http.get('/artwork/posts', () => {
    const responseData: ArtworkResponse = {
      data: [
        {
          postId: 1,
          title: '제목1',
          postImage: '/images/defaultArtworkImage.png',
          userId: 1,
          nickname: '작가1',
          artworkField: 'PAINTING',
          viewCount: 800,
          likeCount: 232,
          commentCount: 20,
          isLiked: true,
        },
        {
          postId: 2,
          title: '제목2',
          postImage: '/images/defaultArtworkImage.png',
          userId: 2,
          nickname: '작가2',
          artworkField: 'PAINTING',
          viewCount: 800,
          likeCount: 232,
          commentCount: 20,
          isLiked: true,
        },
        {
          postId: 3,
          title: '제목1',
          postImage: '/images/defaultArtworkImage.png',
          userId: 3,
          nickname: '작가1',
          artworkField: 'PAINTING',
          viewCount: 800,
          likeCount: 232,
          commentCount: 20,
          isLiked: true,
        },
        {
          postId: 4,
          title: '제목2',
          postImage: '/images/defaultArtworkImage.png',
          userId: 4,
          nickname: '작가2',
          artworkField: 'PAINTING',
          viewCount: 800,
          likeCount: 232,
          commentCount: 20,
          isLiked: true,
        },
        {
          postId: 5,
          title: '제목1',
          postImage: '/images/defaultArtworkImage.png',
          userId: 5,
          nickname: '작가1',
          artworkField: 'PAINTING',
          viewCount: 800,
          likeCount: 232,
          commentCount: 20,
          isLiked: true,
        },
        // {
        //   postId: 6,
        //   title: '제목2',
        //   postImage: '/images/defaultArtworkImage.png',
        //   userId: 6,
        //   nickname: '작가2',
        //   artworkField: 'PAINTING',
        //   viewCount: 800,
        //   likeCount: 232,
        //   commentCount: 20,
        //   isLiked: true,
        // },
        // {
        //   postId: 7,
        //   title: '제목1',
        //   postImage: '/images/defaultArtworkImage.png',
        //   userId: 7,
        //   nickname: '작가1',
        //   artworkField: 'PAINTING',
        //   viewCount: 800,
        //   likeCount: 232,
        //   commentCount: 20,
        //   isLiked: true,
        // },
        // {
        //   postId: 8,
        //   title: '제목2',
        //   postImage: '/images/defaultArtworkImage.png',
        //   userId: 8,
        //   nickname: '작가2',
        //   artworkField: 'PAINTING',
        //   viewCount: 800,
        //   likeCount: 232,
        //   commentCount: 20,
        //   isLiked: true,
        // },
      ],
      page: {
        totalDataCnt: 99,
        totalPages: 10,
        isLastPage: false,
        isFirstPage: true,
        requestPage: 1,
        requestSize: 10,
      },
    };

    return HttpResponse.json(responseData, { status: 200 });
  }),
];
