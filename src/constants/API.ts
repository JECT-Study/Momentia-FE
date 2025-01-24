const USER = {
  signIn: '/user/login/normal',
  signUp: '/user/register',
  socialSignIn: '/user/login/social',
  validateEmail: '/user/validation/email',
  validateNickname: '/user/validation/nickname',
  refresh: '/user/refresh',
  follow: '/user/follow',
};

const MONTHLY = {
  artistOfTheMonth: '/users/top10',
  popularArtwork: '/artwork/posts/popular',
};

const ARTWORK = {
  artworkList: '/artwork/posts',
  followedArtists: '/artwork/followingUsers/posts',
  uploadArtwork: '/artwork/post',
  patchArtwork: (postId: number) => `/artwork/post/${postId}`,
};

const IMAGE = {
  imageUploadRequest: '/image',
  imageUploadComplete: (imageId: number) => `/image/${imageId}`,
};

export { ARTWORK, IMAGE, MONTHLY, USER };
