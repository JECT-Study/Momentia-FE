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

export const FOLLOW_ERROR_MESSAGE: MessageConstantType = {
  FOLLOW_NOT_FOUND: '팔로잉 정보를 찾을 수 없습니다.',
  USER_NOT_FOUND: 'UserId에 해당하는 유저를 찾을 수 없습니다.',
};

export const COMMON_ERROR_MESSAGE: MessageConstantType = {
  UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다. 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
};
