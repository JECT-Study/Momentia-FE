import { ChangeEvent, DragEvent } from 'react';

import {
  getPresignedUrl,
  notifyServerOfUploadCompletion,
  uploadImageToS3,
} from '@/apis/image/postImage';
import { ArtworkFieldsErrors } from '@/app/artwork/upload/page';

import OvalButton from '../Button/OvalButton';
import Icon from '../Icon/Icon';

interface ImageUploadSectionProps {
  uploadedImage: File | null;
  errors: ArtworkFieldsErrors;
  setErrors: (
    callback: (prevErrors: ArtworkFieldsErrors) => ArtworkFieldsErrors,
  ) => void;
  setUploadedImage: (image: File | null) => void;
  clearErrorMessage: (field: string) => void;
}

const ImageUploadSection = ({
  uploadedImage,
  errors,
  setErrors,
  setUploadedImage,
  clearErrorMessage,
}: ImageUploadSectionProps) => {
  const handleImageDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadImage = async (imageFile: File) => {
    try {
      const presignedData = await getPresignedUrl({
        fileSize: imageFile.size,
        fileType: imageFile.type,
      });
      console.log('Presigned URL 결과: ', presignedData);

      if (!presignedData) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          uploadedImageError: 'Presigned URL 요청에 실패했습니다.',
        }));
        return false;
      }

      const { presignedUrl, imageId } = presignedData;
      console.log('imageFileURL: ', presignedUrl, 'imageId: ', imageId);

      const uploadSuccess = await uploadImageToS3({
        file: imageFile,
        uploadUrl: presignedUrl,
      });

      if (uploadSuccess) {
        await notifyServerOfUploadCompletion(imageId);
        setUploadedImage(imageFile);
        console.log('이미지 업로드 성공');
      } else {
        console.error('업로드 실패');
      }
    } catch (error) {
      console.error('이미지 업로드 중 오류 발생: ', error);
    }
  };

  const handleImageDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (uploadedImage) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        uploadedImageError: '이미지는 1장만 업로드할 수 있습니다.',
      }));
      return;
    }

    const imageFile = e.dataTransfer.files[0];
    if (imageFile) {
      setUploadedImage(imageFile);
      uploadImage(imageFile);
      if (errors.uploadedImageError) clearErrorMessage('uploadedImageError');
    }
  };

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      if (uploadedImage) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          uploadedImageError: '이미지는 1장만 업로드할 수 있습니다.',
        }));
        return;
      }

      if (errors.uploadedImageError) clearErrorMessage('uploadedImageError');

      const imageFile = e.target.files[0];
      uploadImage(imageFile);
      console.log('imageFile: ', imageFile);
    }
  };

  const handleImageUploadClick = () => {
    const fileInput = document.getElementById(
      'image-upload',
    ) as HTMLInputElement;

    if (fileInput) fileInput.click();
  };

  return (
    <div
      onDragOver={handleImageDragOver}
      onDrop={handleImageDrop}
      className='relative pb-[70px]'
    >
      {uploadedImage ? (
        <div className='relative w-full h-[511px] md:h-[853px] bg-transparent'>
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt='Uploaded Artwork'
            className='w-full h-full object-contain'
          />
          <button
            aria-label='Button to change artwork image'
            onClick={() => setUploadedImage(null)}
            className='absolute group flex items-center justify-center w-[57px] h-[57px] md:w-[77px] md:h-[77px] 
            right-[30px] bottom-[30px] rounded-full
          bg-[rgba(35,34,37,0.5)] backdrop-blur-[12px]
            shadow-lg hover:bg-[rgba(35,34,37,0.7)] transition'
          >
            <Icon name='Image' size='m' className='block md:hidden' />
            <Icon name='Image' size='l' className='hidden md:block' />

            <span
              className='absolute -top-12 bottom-[122px] flex items-center justify-center h-[35px] px-[14px] gap-[10px]
                text-white text-xs font-medium bg-background-overlay rounded-[5px] leading-[35px] whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            >
              이미지 변경
            </span>
          </button>
        </div>
      ) : (
        <div
          className='flex flex-col justify-center items-center gap-[15px] p-[140px] h-[511px] md:h-[853px]'
          style={{
            border: '2px dashed transparent',
            borderImage:
              'repeating-linear-gradient(45deg, gray 0, gray 10px, transparent 10px, transparent 20px) 1',
          }}
        >
          <p className='body2 text-center text-gray-500 self-stretch'>
            첨부할 작품 이미지를 끌어오거나,
            <br />
            작품 업로드 버튼을 눌러 이미지를 선택하세요.
          </p>
          <label htmlFor='image-upload' className='hidden'>
            <input
              type='file'
              id='image-upload'
              accept='image/*'
              onChange={handleImageUpload}
              className='hidden'
            />
          </label>
          <OvalButton
            variant='primary'
            buttonSize='s'
            onClick={handleImageUploadClick}
          >
            <Icon name='UploadShare' size='m' className='mr-2.5' />
            이미지 업로드
          </OvalButton>
          <p className='button-s text-center text-gray-500'>
            작품 이미지는 1장만 업로드 가능합니다.
          </p>
        </div>
      )}

      {errors.uploadedImageError && (
        <div className='flex justify-center items-center pt-4'>
          <Icon
            name='AlertCircle'
            size='s'
            className='text-system-error mr-2'
          />
          <p className='button-s text-system-error'>
            {errors.uploadedImageError}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageUploadSection;
