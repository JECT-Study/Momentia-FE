'use client';

import { ChangeEvent, DragEvent, useRef } from 'react';

import {
  postPresignedUrl,
  putNotifyImageUploadComplete,
  putUploadImageToS3,
} from '@/apis/image/postImage';
import { ArtworkFieldsErrors } from '@/types';

import OvalButton from '../Button/OvalButton';
import Icon from '../Icon/Icon';

interface ImageUploadSectionProps {
  uploadedImage: File | string | null;
  errors: ArtworkFieldsErrors;
  setErrors: (
    callback: (prevErrors: ArtworkFieldsErrors) => ArtworkFieldsErrors,
  ) => void;
  setUploadedImage: (image: File | null) => void;
  clearErrorMessage: (field: string) => void;
  setUploadedImageId: (imageId: number | null) => void;
  isEditMode: boolean;
}

const ImageUploadSection = ({
  uploadedImage,
  errors,
  setErrors,
  setUploadedImage,
  clearErrorMessage,
  setUploadedImageId,
  isEditMode,
}: ImageUploadSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const uploadImage = async (imageFile: File) => {
    try {
      const presignedData = await postPresignedUrl({
        fileSize: imageFile.size,
        fileType: imageFile.type,
      });

      if (!presignedData) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          uploadedImageError: 'Presigned URL 요청에 실패했습니다.',
        }));
        return false;
      }

      const { presignedUrl, imageId } = presignedData;

      const uploadSuccess = await putUploadImageToS3({
        file: imageFile,
        uploadUrl: presignedUrl,
      });

      if (uploadSuccess) {
        await putNotifyImageUploadComplete(imageId);
        setUploadedImage(imageFile);
        setUploadedImageId(imageId);
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
      setUploadedImage(imageFile);
      uploadImage(imageFile);
    }
  };

  const handleImageUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div
      onDragOver={handleImageDragOver}
      onDrop={handleImageDrop}
      className='relative pb-[70px]'
    >
      {uploadedImage ? (
        <div className='group relative w-full h-[511px] md:h-[853px] bg-transparent'>
          <img
            src={
              typeof uploadedImage === 'string'
                ? uploadedImage
                : URL.createObjectURL(uploadedImage)
            }
            alt='Uploaded Artwork'
            className='w-full h-full object-contain'
          />
          {isEditMode && (
            <div
              className='button-s absolute flex items-center justify-center
              text-white bg-background-overlay h-[35px] rounded-[5px] px-4 py-2
              top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
              opacity-0 group-hover:opacity-100 transition-opacity duration-300'
            >
              작품 이미지는 변경할 수 없어요.
            </div>
          )}

          {isEditMode ? null : (
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
                className='button-s absolute -top-12 bottom-[122px] flex items-center justify-center h-[35px] px-[14px] gap-[10px]
                text-white bg-background-overlay rounded-[5px] leading-[35px] whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-300'
              >
                이미지 변경
              </span>
            </button>
          )}
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
          <input
            type='file'
            id='image-upload'
            ref={fileInputRef}
            onChange={handleImageUpload}
            className='hidden'
          />
          <label htmlFor='image-upload'>
            <OvalButton
              variant='primary'
              buttonSize='s'
              onClick={handleImageUploadClick}
            >
              <Icon name='UploadShare' size='m' className='mr-2.5' />
              이미지 업로드
            </OvalButton>
          </label>
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
