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

export const postPresignedUrl = async ({
  fileSize,
  fileType,
}: PresignedUrlParams) => {
  try {
    const requestData = { fileSize, fileType };

    const response = await authorizedClient.post(
      IMAGE.imageUploadRequest,
      requestData,
    );
    const { presignedUrl, imageId } = response.data;

    if (!(presignedUrl || imageId)) {
      throw new Error('Presigned URL 또는 Image ID가 누락되었습니다.');
    }

    return { presignedUrl, imageId };
  } catch (error) {
    console.error('Presigned URL 조회 실패: ', error);
    return null;
  }
};

export const putUploadImageToS3 = async ({
  file,
  uploadUrl,
}: ImageToS3Params) => {
  const options = {
    body: file,
    headers: {
      'Content-Type': file.type,
    },
  };

  try {
    await authorizedClient.put(uploadUrl, options);

    return true;
  } catch (error) {
    console.error('S3로의 이미지 업로드 실패: ', error);
    return false;
  }
};

export const postNotifyServerOfUploadCompletion = async (imageId: number) => {
  try {
    const response = await authorizedClient.post(
      IMAGE.imageUploadComplete(imageId),
    );

    if (!response.data) {
      throw new Error('서버 알림 실패');
    }
  } catch (error) {
    console.error('서버에 업로드 완료 알림 실패: ', error);
  }
};
