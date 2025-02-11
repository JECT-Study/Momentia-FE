const ROUTE = {
  home: '/',
  signIn: '/auth/sign-in',
  signUp: '/auth/sign-up',
  artworkList: '/artwork/list',
  artworkDetail: '/artwork/detail',
  artworkUpload: '/artwork/upload',
  collection: '/collection',
  profile: (userId: number) => `/profile?userId=${userId}`,
};

export default ROUTE;
