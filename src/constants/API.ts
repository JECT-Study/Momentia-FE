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
  artworkPost: '/artwork/post',
  artworkLike: (postId: number) => `/artwork/post/${postId}/like`,
  artworkPostComment: (postId: number) => `/artwork/post/${postId}/comment`,
};

const COLLECTION = {
  collection: '/collection',
  allCollectionsList: '/collections/all',
  collectionList: '/collections',
  collectionAddArtwork: (collectionId: number, postId: number) =>
    `/collection/${collectionId}/post/${postId}`,
};

export { ARTWORK, COLLECTION, MONTHLY, USER };
