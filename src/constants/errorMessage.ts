type MessageConstantType = Record<string, string>;

export const SIGNIN_ERROR_MESSAGE: MessageConstantType = {
  EMAIL_REQUIRED: '이메일은 필수입니다.',
  NICKNAME_REQUIRED: '닉네임은 필수입니다.',
  PASSWORD_REQUIRED: '닉네임은 필수입니다.',
  INVALID_EMAIL: '유효하지 않은 이메일 형식입니다.',
  INVALID_PASSWORD: '영문, 숫자, 특수문자를 포함해 9자 이상 입력해주세요.',
  INVALID_NICKNAME: '사용할 수 없는 닉네임입니다.',
  EXCEED_NICKNAME_LENGTH: '최대 닉네임 길이를 초과했습니다.',
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
  USER_NOT_FOUND: 'userId에 해당하는 유저를 찾을 수 없습니다.',
};

export const COMMON_ERROR_MESSAGE: MessageConstantType = {
  UNKNOWN_ERROR: '알 수 없는 에러가 발생했습니다. 다시 시도해주세요.',
  NETWORK_ERROR: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
};

export const LIKE_ERROR_MESSAGE: MessageConstantType = {
  ALREADY_LIKE: '이미 좋아요한 작품입니다.',
  POST_NOT_FOUND: '요청한 리소스가 없습니다.',
  LIKE_ALREADY_REMOVED:
    '좋아요 하지 않은 작품이거나 이미 좋아요 취소된 작품입니다.',
};

export const ARTWORK_ERROR_MESSAGE: MessageConstantType = {
  NO_PERMISSION: '본인의 게시글이 아닙니다.',
  ARTWORK_POST_NOT_FOUND: '리소스를 찾을 수 없습니다.',
};

export const ARTWORK_POST_ERROR_MESSAGE: MessageConstantType = {
  INVALID_PARAMETER: '요청한 정보가 올바르지 않습니다.',
  INVALID_ARTWORK_TITLE: '제목을 1자 이상 50자 이하로 입력해 주세요.',
  INVALID_ARTWORK_FIELD: '카테고리를 올바르게 지정해 주세요.',
  INVALID_STATUS: '공개 여부를 올바르게 지정해 주세요.',
  IMAGE_NOT_FOUND: '이미지 정보가 올바르지 않습니다.',
  INVALID_ARTWORK_EXPLANATION: '설명을 1000자 이하로 입력해 주세요.',
};

export const ARTWORK_PATCH_ERROR_MESSAGE: MessageConstantType = {
  INVALID_PARAMETER: '요청한 정보가 올바르지 않습니다.',
  INVALID_ARTWORK_TITLE: '제목을 1자 이상 50자 이하로 입력해 주세요.',
  INVALID_ARTWORK_FIELD: '카테고리를 올바르게 지정해 주세요.',
  INVALID_STATUS: '공개 여부를 올바르게 지정해 주세요.',
  INVALID_ARTWORK_EXPLANATION: '설명을 1000자 이하로 입력해 주세요.',
  NOT_OWNER: '본인의 작품이 아닙니다.',
};

export const COMMENT_ERROR_MESSAGE: MessageConstantType = {
  INVALID_PARAMETER: '요청한 정보가 올바르지 않습니다.',
  NOT_OWNER: '본인의 댓글이 아닙니다.',
  COMMENT_NOT_FOUND: '리소스를 찾을 수 없습니다.',
  INVALID_COMMENT_CONTENT:
    '댓글은 최소 1자 이상의 문자를 포함해야 하며, 공백만으로 구성된 내용은 입력할 수 없습니다.',
  POST_NOT_FOUND: '요청한 리소스를 찾을 수 없습니다.',
  NOT_AUTHORIZED: '댓글에 대한 권한이 없습니다.',
};

export const COLLECTION_ADD_ARTWORK_ERROR_MESSAGE: MessageConstantType = {
  COLLECTION_NOT_FOUND: '컬렉션 리소스를 찾을 수 없습니다.',
  POST_NOT_FOUND: '작품 리소스를 찾을 수 없습니다.',
  DUPLICATE_COLLECTION_ARTWORK: '컬렉션에 이미 저장된 작품입니다.',
  NO_PERMISSION: '컬렉션에 대한 권한이 없습니다.',
};

export const PROFILE_COLLECTION_GET_ERROR_MESSAGE: MessageConstantType = {
  USER_NOT_FOUND: '해당 유저를 찾을 수 없습니다.',
  NO_PERMISSION: 'userId를 찾을 수 없고, 로그인하지 않은 상태입니다.',
};

export const COLLECTION_POST_ERROR_MESSAGE: MessageConstantType = {
  INVALID_PARAMETER: '요청한 정보가 올바르지 않습니다.',
  INVALID_COLLECTION_NAME: '컬렉션 이름을 1자 이상 10자 이하로 입력해 주세요.',
  INVALID_STATUS: '공개 여부를 올바르게 지정해 주세요.',
  DUPLICATE_COLLECTION_NAME: '이미 존재하는 컬렉션 이름입니다.',
};

export const COLLECTION_DELETE_ERROR_MESSAGE: MessageConstantType = {
  NO_PERMISSION: '본인의 컬렉션이 아닙니다.',
  COLLECTION_NOT_FOUND: '컬렉션 리소스를 찾을 수 없습니다.',
};

export const COLLECTION_PATCH_ERROR_MESSAGE: MessageConstantType = {
  INVALID_PARAMETER: '요청한 정보가 올바르지 않습니다.',
  INVALID_COLLECTION_NAME: '컬렉션 이름을 1자 이상 10자 이하로 입력해 주세요.',
  INVALID_STATUS: '요청한 status가 잘못되었거나 유효하지 않습니다.',
  NO_PERMISSION: '본인의 컬렉션이 아닙니다.',
  NOT_FOUND: '컬렉션 리소스를 찾을 수 없습니다.',
  DUPLICATE_COLLECTION_NAME: '이미 존재하는 컬렉션 이름입니다.',
};

export const COLLECTION_ARTWORKS_ERROR_MESSAGE: MessageConstantType = {
  COLLECTION_NOT_FOUND: '요청한 컬렉션 id에 해당하는 컬렉션이 없습니다.',
};

export const EDIT_USER_PROFILE_ERROR_MESSAGE: MessageConstantType = {
  INVALID_FIELD: '작업 분야에 해당하는 형식이 아닙니다.',
  INVALID_NICKNAME: '사용할 수 없는 닉네임 입니다.',
  INVALID_INTRODUCTION: '잘못된 형태의 자기소개 입니다.',
  DUPLICATE_NICKNAME: '이미 사용중인 닉네임 입니다.',
};
