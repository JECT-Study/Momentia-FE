interface ValidateResponse {
  isValid: boolean;
  message: string;
}

interface LoginFormType {
  email: string;
  password: string;
}

interface AuthTokenType {
  accessToken: string;
  refreshToken: string;
}

interface SocialLoginAuthType {
  isRegistered: boolean;
  token: AuthTokenType;
}

interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
}
