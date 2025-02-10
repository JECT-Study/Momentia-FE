import { useMutation, useQueryClient } from '@tanstack/react-query';

import {
  postPresignedUrl,
  putNotifyImageUploadComplete,
  putUploadImageToS3,
} from '@/apis/image/postImage';
import patchProfileInfo from '@/apis/user/patchProfileInfo';
import { USER } from '@/constants/API';
import { UpdateProfileType, UserStringProfileType } from '@/types/user';
import TokenHandler from '@/utils/tokenHandler';

export interface UsePatchProfileInfoProps {
  imageFile?: File;
  updateInfo: UserStringProfileType;
}

const usePatchProfileInfo = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserProfile, isPending } = useMutation({
    mutationFn: async ({ imageFile, updateInfo }: UsePatchProfileInfoProps) => {
      try {
        const newProfile = { ...updateInfo } as UpdateProfileType;
        let imageId: number = 0;

        if (imageFile) {
          const presignedData = await postPresignedUrl({
            fileSize: imageFile.size,
            fileType: imageFile.type,
          });

          if (!presignedData) throw new Error('Presigned URL 요청 실패');

          const { presignedUrl, imageId: newImageId } = presignedData;
          imageId = newImageId;

          const uploadSuccess = await putUploadImageToS3({
            file: imageFile,
            uploadUrl: presignedUrl,
          });

          if (!uploadSuccess) throw new Error('이미지 업로드 실패');

          const result = await putNotifyImageUploadComplete(imageId);

          if (result) newProfile.profileImage = imageId;
        }

        return await patchProfileInfo(newProfile);
      } catch (error) {
        console.error('프로필 업데이트 중 오류 발생:', error);
        throw error;
      }
    },
    onError: (error) => {
      alert(`프로필 업데이트 실패: ${error.message}`);
    },
    onSuccess: () => {
      const userId = TokenHandler.getUserIdFromToken();

      queryClient.invalidateQueries({
        queryKey: [USER.userProfile, userId],
      });
    },
  });

  return { updateUserProfile, isPending };
};

export default usePatchProfileInfo;
