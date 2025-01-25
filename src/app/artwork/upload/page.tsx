'use client';

import { ChangeEvent, useCallback, useState } from 'react';

import ImageUploadSection from '@/components/ArtworkUploadPage/ImageUploadSection';
import OvalButton from '@/components/Button/OvalButton';
import FilterDropdown from '@/components/FilterDropdown';
import BasicInput from '@/components/Input/BasicInput';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ARTWORK_FIELDS from '@/constants/artworkFields';
import usePatchArtwork from '@/hooks/serverStateHooks/usePatchArtwork';
import usePostArtwork from '@/hooks/serverStateHooks/usePostArtwork';
import modalStore from '@/stores/modalStore';
import { ArtworkFieldsErrors, ArtworkUploadData } from '@/types';

import Textarea from '../../../components/Input/Textarea';

interface ArtworkUploadProps {
  initialData: Omit<ArtworkUploadData, 'postImage' | 'status'> & {
    status: 'PUBLIC' | 'PRIVATE';
  };
  postId: number;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 1000;
const REQUIRED_FIELDS_ERROR_MESSAGE = '필수 항목입니다.';
const PRIVACY_SETTING_OPTIONS = [
  { name: '전체공개', value: 'PUBLIC' },
  { name: '비공개', value: 'PRIVATE' },
];

const ArtworkUpload = ({ initialData, postId }: ArtworkUploadProps) => {
  const [artworkTitle, setArtworkTitle] = useState(initialData?.title || '');
  const [selectedArtworkField, setSelectedArtworkField] = useState(
    initialData?.artworkField || '',
  );
  const [privacySetting, setPrivacySetting] = useState(
    initialData?.status || 'PUBLIC',
  );
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [artworkDescription, setArtworkDescription] = useState(
    initialData?.explanation || '',
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ArtworkFieldsErrors>({
    artworkTitleError: '',
    selectedArtworkFieldError: '',
    uploadedImageError: '',
  });

  const isEditMode = Boolean(postId);

  const clearErrorMessage = useCallback((targetField: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [targetField]: '' }));
  }, []);

  const handleArtworkTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      setPrivacySetting(privacySettingOption.value as 'PUBLIC' | 'PRIVATE');
    }
  };

  const selectedArtworkFieldName =
    ARTWORK_FIELDS.find((field) => field.value === selectedArtworkField)
      ?.name || '';

  const selectedPrivacySettingName =
    PRIVACY_SETTING_OPTIONS.find((option) => option.value === privacySetting)
      ?.name || '전체공개';

  const validateArtworkUploadForm = () => {
    const newErrors: ArtworkFieldsErrors = {};

    if (!artworkTitle.trim())
      newErrors.artworkTitleError = REQUIRED_FIELDS_ERROR_MESSAGE;
    if (!selectedArtworkField.trim())
      newErrors.selectedArtworkFieldError = REQUIRED_FIELDS_ERROR_MESSAGE;
    if (!(isEditMode && uploadedImage))
      newErrors.uploadedImageError = REQUIRED_FIELDS_ERROR_MESSAGE;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const {
    mutate: postArtwork,
    isSuccess: postArtworkSuccess,
    isError: postArtworkError,
  } = usePostArtwork();

  const handleArtworkUpload = async () => {
    if (!(uploadedImage && isEditMode)) {
      console.error('이미지가 업로드되지 않았습니다.');
      return;
    }

    const uploadedArtworkData = {
      title: artworkTitle,
      artworkField: selectedArtworkField,
      postImage: uploadedImage,
      explanation: artworkDescription,
      status: privacySetting,
    };

    console.log('업로드 요청한 작품 데이터: ', uploadedArtworkData);
    setIsSubmitting(true);
    postArtwork(uploadedArtworkData);
  };

  const {
    mutate: patchArtwork,
    isSuccess: patchArtworkSuccess,
    isError: patchArtworkError,
  } = usePatchArtwork();

  const handleArtworkUpdate = async () => {
    const editedArtworkData = {
      title: artworkTitle,
      artworkField: selectedArtworkField,
      explanation: artworkDescription,
      status: privacySetting,
    };

    console.log('수정 요청한 작품 데이터: ', editedArtworkData);
    setIsSubmitting(true);

    patchArtwork({
      postId,
      data: editedArtworkData,
    });
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

  const handleSubmit = () => {
    isEditMode ? handleArtworkUpdate() : handleArtworkUpload();
  };

  const handleCancelClick = () => {
    const { openModal } = modalStore.getState();

    openModal({
      contents: (
        <ConfirmModal>
          작성 중인 내용을 저장하지 않고 나가시겠습니까?
        </ConfirmModal>
      ),
      modalSize: 'md',
    });
  };

  return (
    <div className='max-w-[1920px] m-auto px-[36px] py-[70px] lg:px-[140px]'>
      {/* {toastMessage && (
          <ToastPopup
            message={toastMessage}
            onClose={() => setToastMessage(null)}
          />
        )} */}

      <h1>작품 업로드</h1>
      <div className='pt-[70px] pb-[58px] md:pb-[40px]'>
        <BasicInput
          type='text'
          label='작품 제목'
          placeholder='작품 제목을 입력하세요.'
          value={artworkTitle}
          onChange={handleArtworkTitleChange}
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

      <ImageUploadSection
        uploadedImage={uploadedImage}
        errors={errors}
        setErrors={setErrors}
        setUploadedImage={setUploadedImage}
        clearErrorMessage={clearErrorMessage}
      />

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
          onClick={handleCancelClick}
          className='button-s text-gray-300 flex items-center justify-center rounded-full
            gap-[10px] px-[28px] leading-[50px]
            transition-all duration-300 ease-in-out active:scale-95 hover:opacity-70'
        >
          취소
        </button>

        {!isSubmitting && isRequiredFieldsValid ? (
          <OvalButton variant='primary' buttonSize='s' onClick={handleSubmit}>
            {isEditMode ? '수정' : '업로드'}
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

        {postArtworkError && <p>[업로드 실패] 다시 시도해 주세요.</p>}
        {patchArtworkError && <p>[수정 실패] 다시 시도해 주세요.</p>}
      </div>
    </div>
  );
};

export default ArtworkUpload;
