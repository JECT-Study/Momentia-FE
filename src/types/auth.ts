export interface SignInFormType {
  email: string;
  password: string;
}

export interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

export interface SocialSignInAuthType {
  isRegistered: boolean;
  token: AuthTokenType;
}

export interface SignUpFormType extends SignInFormType {
  nickname: string;
}
