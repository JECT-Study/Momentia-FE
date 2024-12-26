interface ValidateResponse {
  isValid: boolean;
  message: string;
}

interface SignInFormType {
  email: string;
  password: string;
}

interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

interface SocialSignInAuthType {
  isRegistered: boolean;
  token: AuthTokenType;
}

interface SignUpFormType extends SignInFormType {
  nickname: string;
}