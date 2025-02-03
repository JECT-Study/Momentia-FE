'use client';

import { useSearchParams } from 'next/navigation';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import getExistingArtwork from '@/apis/artwork/getExistingArtwork';
import ImageUploadSection from '@/components/ArtworkUploadPage/ImageUploadSection';
import OvalButton from '@/components/Button/OvalButton';
import FilterDropdown from '@/components/FilterDropdown';
import BasicInput from '@/components/Input/BasicInput';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ARTWORK_FIELDS from '@/constants/artworkFields';
import usePatchArtwork from '@/hooks/serverStateHooks/usePatchArtwork';
import usePostArtwork from '@/hooks/serverStateHooks/usePostArtwork';
import modalStore from '@/stores/modalStore';
import { ArtworkFieldsErrors, PatchArtworkData } from '@/types';

import Textarea from '../../../components/Input/Textarea';

interface PrivacySettingOption {
  name: '전체공개' | '비공개';
  value: 'PUBLIC' | 'PRIVATE';
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 1000;
const REQUIRED_FIELDS_ERROR_MESSAGE = '필수 항목입니다.';
const PRIVACY_SETTING_OPTIONS: PrivacySettingOption[] = [
  { name: '전체공개', value: 'PUBLIC' },
  { name: '비공개', value: 'PRIVATE' },
];

const ArtworkUpload = () => {
  const [artworkTitle, setArtworkTitle] = useState('');
  const [selectedArtworkField, setSelectedArtworkField] = useState('');
  const [privacySetting, setPrivacySetting] = useState<'PUBLIC' | 'PRIVATE'>(
    'PUBLIC',
  );
  const [uploadedImage, setUploadedImage] = useState<File | string | null>(
    null,
  );
  const [uploadedImageId, setUploadedImageId] = useState<number | null>(null);
  const [artworkDescription, setArtworkDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<ArtworkFieldsErrors>({
    artworkTitleError: '',
    selectedArtworkFieldError: '',
    uploadedImageError: '',
  });

  const searchParams = useSearchParams();
  const postId = searchParams.get('postId');
  const parsedPostId = postId ? parseInt(postId, 10) : null;
  const isEditMode = Boolean(postId);
  const existingArtworkRef = useRef<PatchArtworkData | null>(null);

  const handleArtworkDescriptionOnChange = (
    e: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setArtworkDescription(e.target.value);
  };

  const clearErrorMessage = useCallback((targetField: string) => {
    setErrors((prevErrors) => ({ ...prevErrors, [targetField]: '' }));
  }, []);

  const handleArtworkTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (errors.artworkTitleError) clearErrorMessage('artworkTitleError');

    setArtworkTitle(e.target.value);
  };

  const handleArtworkFieldClick = (artworkField: string) => {
    const selectedField = ARTWORK_FIELDS.find(
      (field) => field.name === artworkField,
    );

    if (selectedField) {
      isEditMode
        ? setSelectedArtworkField(selectedField.name)
        : setSelectedArtworkField(selectedField.value);
    }

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

  const { mutate: postArtwork, isError: postArtworkError } = usePostArtwork();

  const handleArtworkUpload = () => {
    if (!uploadedImage) {
      console.error('이미지가 업로드되지 않았습니다.');
      return;
    }

    const uploadedArtworkData = {
      title: artworkTitle,
      artworkField: selectedArtworkField,
      postImage: uploadedImageId,
      explanation: artworkDescription,
      status: privacySetting,
    };

    setIsSubmitting(true);
    postArtwork(uploadedArtworkData);
  };

  const { mutate: patchArtwork, isError: patchArtworkError } =
    usePatchArtwork();

  useEffect(() => {
    const fetchArtworkData = async () => {
      if (parsedPostId) {
        try {
          const existingArtwork = await getExistingArtwork(parsedPostId);
          existingArtworkRef.current = existingArtwork;

          setArtworkTitle(existingArtwork.title);
          setSelectedArtworkField(existingArtwork.artworkField);
          setPrivacySetting(existingArtwork.status);
          setUploadedImage(existingArtwork.postImage);
          setArtworkDescription(existingArtwork.explanation);
        } catch (error) {
          console.error('작품 데이터를 불러오는 중 오류 발생: ', error);
        }
      }
    };

    fetchArtworkData();
  }, [parsedPostId]);

  const handleArtworkUpdate = async () => {
    if (!parsedPostId) return;

    const artworkFieldValue = ARTWORK_FIELDS.find(
      (field) => field.name === selectedArtworkField,
    )?.value;

    const editedArtworkData: PatchArtworkData = {
      title: artworkTitle,
      artworkField: artworkFieldValue,
      explanation: artworkDescription,
      status: privacySetting,
    };

    setIsSubmitting(true);
    patchArtwork({
      postId: parsedPostId,
      data: editedArtworkData,
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequiredFieldsNotFilledOut = () => {
    validateArtworkUploadForm();
    handleScrollToTop();
  };

  const isModified =
    isEditMode &&
    existingArtworkRef.current &&
    (artworkTitle !== existingArtworkRef.current.title ||
      selectedArtworkField !== existingArtworkRef.current.artworkField ||
      artworkDescription !== existingArtworkRef.current.explanation ||
      privacySetting !== existingArtworkRef.current.status);

  const isRequiredFieldsValid =
    (isEditMode ? isModified : true) &&
    artworkTitle &&
    selectedArtworkField &&
    uploadedImage &&
    !isSubmitting;

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
          selected={
            isEditMode ? selectedArtworkField : selectedArtworkFieldName
          }
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
        setUploadedImageId={setUploadedImageId}
        isEditMode={isEditMode}
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
            {isEditMode ? '수정' : '업로드'}
          </button>
        )}

        {postArtworkError && <p>[업로드 실패] 다시 시도해 주세요.</p>}
        {patchArtworkError && <p>[수정 실패] 다시 시도해 주세요.</p>}
      </div>
    </div>
  );
};

export default ArtworkUpload;
