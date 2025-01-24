import { IMAGE } from '@/constants/API';

import { authorizedClient } from '..';

interface PresignedUrlParams {
  fileSize: number;
  fileType: string;
}

interface ImageToS3Params {
  file: File;
  uploadUrl: string;
}

export const getPresignedUrl = async ({
  fileSize,
  fileType,
}: PresignedUrlParams) => {
  try {
    const requestData = { fileSize, fileType };
    console.log('요청 파라미터: ', requestData);

    const response = await authorizedClient.post(
      IMAGE.imageUploadRequest,
      requestData,
    );
    const { presignedUrl, imageId } = response.data;
    console.log('Presigned URL 응답 데이터: ', response.data);

    if (!(presignedUrl || imageId)) {
      throw new Error('Presigned URL 또는 Image ID가 누락되었습니다.');
    }

    return { presignedUrl, imageId };
  } catch (error) {
    console.error('Presigned URL 조회 실패: ', error);
    return null;
  }
};

export const uploadImageToS3 = async ({ file, uploadUrl }: ImageToS3Params) => {
  const options = {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  };

  try {
    await authorizedClient.put(uploadUrl, options);
    console.log('S3 업로드 URL: ', uploadUrl);
    console.log('S3 업로드 성공');
    return true;
  } catch (error) {
    console.error('S3로의 이미지 업로드 실패: ', error);
    return false;
  }
};

export const notifyServerOfUploadCompletion = async (imageId: number) => {
  try {
    const response = await authorizedClient.post(
      IMAGE.imageUploadComplete(imageId),
    );
    console.log('notifyServerOfUploadCompletion Response: ', response);

    if (!response.data) {
      throw new Error('서버 알림 실패');
    }

    console.log('서버로 전달할 imageId: ', imageId);
    console.log('서버에 업로드 완료 알림 성공');
  } catch (error) {
    console.error('서버에 업로드 완료 알림 실패: ', error);
  }
};
