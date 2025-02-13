import {
  postPresignedUrl,
  putNotifyImageUploadComplete,
  putUploadImageToS3,
} from '@/apis/image/postImage';
import patchProfileInfo from '@/apis/user/patchProfileInfo';
import { UpdateProfileType, UserStringProfileType } from '@/types/user';

export interface UpdateProfileInfoProps {
  imageFile?: File;
  updateInfo: UserStringProfileType;
}

const uploadProfileImage = async (imageFile: File): Promise<number> => {
  const presignedData = await postPresignedUrl({
    fileSize: imageFile.size,
    fileType: imageFile.type,
  });

  if (!presignedData) throw new Error('Presigned URL 요청 실패');

  const { presignedUrl, imageId } = presignedData;

  const uploadSuccess = await putUploadImageToS3({
    file: imageFile,
    uploadUrl: presignedUrl,
  });

  if (!uploadSuccess) throw new Error('이미지 업로드 실패');

  await putNotifyImageUploadComplete(imageId);

  return imageId;
};

const updateProfileInfo = async ({
  imageFile,
  updateInfo,
}: UpdateProfileInfoProps) => {
  const newProfile = { ...updateInfo } as UpdateProfileType;

  if (imageFile) {
    const imageId = await uploadProfileImage(imageFile);
    newProfile.profileImage = imageId;
  }

  return patchProfileInfo(newProfile);
};

export default updateProfileInfo;
