'use client';

import { ChangeEvent, useState } from 'react';

import OvalButton from '@/components/Button/OvalButton';
import FilterDropdown from '@/components/FilterDropdown';
import Icon from '@/components/Icon/Icon';
import BasicInput from '@/components/Input/BasicInput';
import ARTWORK_FIELDS from '@/constants/artworkFields';
import useArtworkPost from '@/hooks/serverStateHooks/useArtworkPost';

import Textarea from '../../../components/Input/Textarea';

interface ArtworkFieldsErrors {
  artworkTitleError?: string;
  selectedArtworkFieldError?: string;
  uploadedImageError?: string;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 1000;
const REQUIRED_FIELDS_ERROR_MESSAGE = '필수 항목입니다.';

const PRIVACY_SETTING_OPTIONS = [
  { name: '전체공개', value: 'PUBLIC' },
  { name: '비공개', value: 'PRIVATE' },
];

const ArtworkUpload = () => {
  const [artworkTitle, setArtworkTitle] = useState('');
  const [selectedArtworkField, setSelectedArtworkField] = useState('');
  const [privacySetting, setPrivacySetting] = useState('PUBLIC');
  const [uploadedImage, setUploadedImage] = useState<string>('');
  const [artworkDescription, setArtworkDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ArtworkFieldsErrors>({
    artworkTitleError: '',
    selectedArtworkFieldError: '',
    uploadedImageError: '',
  });

  const clearErrorMessage = (targetField: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [targetField]: '' }));
  };

  const handleArtworkTitleChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setArtworkTitle(e.target.value);

    if (errors.artworkTitleError) clearErrorMessage('artworkTitleError');
  };

  const handleArtworkDescriptionOnChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setArtworkDescription(e.target.value);
  };

  const handleArtworkFieldClick = (artworkField: string) => {
    const selectedField = ARTWORK_FIELDS.find(
      (field) => field.name === artworkField,
    );

    if (selectedField) setSelectedArtworkField(selectedField.value);

    if (!artworkTitle.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        artworkTitleError: REQUIRED_FIELDS_ERROR_MESSAGE,
      }));
    } else {
      clearErrorMessage('artworkTitleError');
    }

    if (errors.selectedArtworkFieldError)
      clearErrorMessage('selectedArtworkFieldError');
  };

  const handlePrivacySettingChange = (selectedName: string) => {
    const privacySettingOption = PRIVACY_SETTING_OPTIONS.find(
      (option) => option.name === selectedName,
    );

    if (privacySettingOption) {
      setPrivacySetting(privacySettingOption.value);
    }
  };

  const selectedArtworkFieldName =
    ARTWORK_FIELDS.find((field) => field.value === selectedArtworkField)
      ?.name || '';

  const selectedPrivacySettingName =
    PRIVACY_SETTING_OPTIONS.find((option) => option.value === privacySetting)
      ?.name || '전체공개';

  const handleImageUpload = () => {
    // TODO: 실제 이미지 업로드 로직 구현
    setUploadedImage('/images/defaultArtworkImage.png'); // 테스트용

    if (errors.uploadedImageError) clearErrorMessage('uploadedImageError');
  };

  const validateArtworkUploadForm = () => {
    const newErrors: ArtworkFieldsErrors = {};

    if (!artworkTitle.trim())
      newErrors.artworkTitleError = REQUIRED_FIELDS_ERROR_MESSAGE;
    if (!selectedArtworkField.trim())
      newErrors.selectedArtworkFieldError = REQUIRED_FIELDS_ERROR_MESSAGE;
    if (!uploadedImage)
      newErrors.uploadedImageError = REQUIRED_FIELDS_ERROR_MESSAGE;
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isRequiredFieldsValid =
    artworkTitle && selectedArtworkField && uploadedImage && !isSubmitting;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequiredFieldsNotFilledOut = () => {
    validateArtworkUploadForm();
    handleScrollToTop();
  };

  const { mutate: uploadArtwork, isSuccess, isError } = useArtworkPost();

  const handleArtworkUpload = () => {
    if (!uploadedImage) {
      console.error('이미지가 업로드되지 않았습니다.');
      return;
    }

    const artworkData = {
      title: artworkTitle,
      artworkField: selectedArtworkField,
      postImage: uploadedImage,
      explanation: artworkDescription,
      status: privacySetting,
    };

    console.log('업로드 요청한 작품 데이터: ', artworkData);

    setIsSubmitting(true);
    uploadArtwork(artworkData);

    // TODO: 작성한 글 상세 페이지로 이동
  };

  return (
    <div className='max-w-[1920px] m-auto px-[36px] py-[70px] lg:px-[140px]'>
      <h1>작품 업로드</h1>
      <div className='pt-[70px] pb-[58px] md:pb-[40px]'>
        <BasicInput
          type='text'
          label='작품 제목'
          placeholder='작품 제목을 입력하세요.'
          value={artworkTitle}
          onChange={handleArtworkTitleChanged}
          showTextLength={true}
          maxLength={MAX_TITLE_LENGTH}
          isInvalid={!!errors.artworkTitleError}
          errorMessage={errors.artworkTitleError}
        />
      </div>

      <div className='flex flex-col md:flex-row items-start self-stretch gap-[38px] md:gap-[50px] pb-[78px]'>
        <FilterDropdown
          label='작품 카테고리'
          placeholder='카테고리 선택'
          options={ARTWORK_FIELDS.map((field) => field.name)}
          selected={selectedArtworkFieldName}
          onChange={(value) => handleArtworkFieldClick(value)}
          isInvalid={!!errors.selectedArtworkFieldError}
          errorMessage={errors.selectedArtworkFieldError}
          className='w-full'
        />

        <FilterDropdown
          label='공개범위'
          options={PRIVACY_SETTING_OPTIONS.map((option) => option.name)}
          selected={selectedPrivacySettingName}
          onChange={handlePrivacySettingChange}
          className='w-full'
        />
      </div>

      <div className='relative pb-[70px]'>
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
          <OvalButton
            variant='primary'
            buttonSize='s'
            onClick={handleImageUpload}
          >
            <Icon name='UploadShare' size='m' className='mr-2.5' />
            이미지 업로드
          </OvalButton>
          <p className='button-s text-center text-gray-500'>
            작품 이미지는 1장만 업로드 가능합니다.
          </p>

          {errors.uploadedImageError && (
            <div className='flex items-center'>
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

          {uploadedImage && (
            <img
              src={uploadedImage}
              alt='Uploaded Artwork'
              className='mt-4 max-h-[200px] object-contain'
            />
          )}

          <button
            aria-label='Button to change artwork image'
            className='flex justify-center items-center w-[57px] h-[57px] md:w-[77px] md:h-[77px]
            absolute right-[30px] bottom-[30px] rounded-full
            bg-[rgba(35,34,37,0.5)] backdrop-blur-[12px]
            shadow-lg hover:bg-[rgba(35,34,37,0.7)] transition'
          >
            <Icon name='Image' size='m' className='block md:hidden' />
            <Icon name='Image' size='l' className='hidden md:block' />
          </button>
        </div>
      </div>

      <Textarea
        label='작품 설명'
        placeholder='작품 설명을 입력하세요.'
        value={artworkDescription}
        onChange={handleArtworkDescriptionOnChange}
        showTextLength={true}
        maxLength={MAX_DESCRIPTION_LENGTH}
      />

      <div className='pt-[30px] flex justify-end items-center gap-[20px]'>
        <button
          className='button-s text-gray-300 flex items-center justify-center rounded-full
            gap-[10px] px-[28px] leading-[50px]
            transition-all duration-300 ease-in-out active:scale-95 hover:opacity-70'
        >
          취소
        </button>

        {!isSubmitting && isRequiredFieldsValid ? (
          <OvalButton
            variant='primary'
            buttonSize='s'
            onClick={handleArtworkUpload}
          >
            업로드
          </OvalButton>
        ) : (
          <button
            onClick={handleRequiredFieldsNotFilledOut}
            className='button-s text-gray-300 bg-gray-700 px-[28px] leading-[50px]
            flex items-center justify-center rounded-full gap-[10px]
            transition-all duration-300 ease-in-out active:scale-95 hover:opacity-70 hover:cursor-not-allowed'
          >
            업로드
          </button>
        )}

        {isError && <p>업로드 실패. 다시 시도해 주세요.</p>}
      </div>
    </div>
  );
};

export default ArtworkUpload;
