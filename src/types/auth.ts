interface ValidateResponse {
  isValid: boolean;
  message: string;
}

interface LoginFormType {
  email: string;
  password: string;
}

interface DefaultAuthType {
  accessToken: string;
  refreshToken: string;
}

interface SocialLoginAuthType {
  isRegistered: boolean;
  token: DefaultAuthType;
}

interface SignUpFormType {
  email: string;
  password: string;
  nickname: string;
}

type SocialLoginType = 'google' | 'kakao';
