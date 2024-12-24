type MessageConstantType = Record<string, string>;

export const SIGNIN_ERROR_MESSAGE: MessageConstantType = {
  INVALID_EMAIL: '이메일 형식이 아닙니다.',
  INVALID_NICKNAME: '사용할 수 없는 닉네임입니다.',
  EMAIL_NOT_VERIFIED: '잘못된 인증번호입니다.',
  DUPLICATE_EMAIL: '이미 가입된 이메일입니다.',
  DUPLICATE_NICKNAME: '이미 사용 중인 닉네임입니다.',
};

export const SIGNUP_ERROR_MESSAGE: MessageConstantType = {
  NOT_EXIST_USER: '로그인에 실패했습니다. 아이디 또는 비밀번호를 확인해주세요.',
};

export const NICKNAME_VALIDATE_ERROR_MESSAGE: MessageConstantType = {
  INVALID_NICKNAME: '금칙어가 포함된 닉네임입니다.',
  DUPLICATE_NICKNAME: '이미 사용중인 닉네임입니다.',
};

export const EMAIL_VALIDATE_ERROR_MESSAGE: MessageConstantType = {
  DUPLICATE_EMAIL: '이미 가입된 이메일입니다.',
};
