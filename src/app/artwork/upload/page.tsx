'use client';

import { ChangeEvent, useState } from 'react';

import OvalButton from '@/components/Button/OvalButton';
import FilterDropdown from '@/components/FilterDropdown';
import Icon from '@/components/Icon/Icon';
import BasicInput from '@/components/Input/BasicInput';

interface ArtworkField {
  name: string;
  value: string;
}

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 1000;

const PRIVACY_SETTING_OPTIONS = [
  { name: '전체공개', value: 'PUBLIC' },
  { name: '비공개', value: 'PRIVATE' },
];

const ARTWORK_FIELDS: ArtworkField[] = [
  { name: '회화', value: 'PAINTING' },
  { name: '공예/조각', value: 'CRAFTSCULPTURE' },
  { name: '드로잉', value: 'DRAWING' },
  { name: '판화', value: 'PRINTMAKING' },
  { name: '서예', value: 'CALLIGRAPHY' },
  { name: '일러스트', value: 'ILLUSTRATION' },
  { name: '디지털아트', value: 'DIGITALART' },
  { name: '사진', value: 'PHOTOGRAPHY' },
  { name: '기타', value: 'OTHERS' },
];

const ArtworkUpload = () => {
  const [artworkTitle, setArtworkTitle] = useState('');
  const [selectedArtworkField, setSelectedArtworkField] = useState('');
  const [privacySetting, setPrivacySetting] = useState<'전체공개' | '비공개'>(
    '전체공개',
  );
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [artworkDescription, setArtworkDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{
    artworkTitle?: string;
    selectedArtworkField?: string;
    uploadedImage?: string;
  }>({
    artworkTitle: '',
    selectedArtworkField: '',
    uploadedImage: '',
  });

  const handleArtworkTitleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setArtworkTitle(e.target.value);

    if (errors.artworkTitle) {
      setErrors((prevErrors) => ({ ...prevErrors, artworkTitle: '' }));
    }
  };

  const handlertworkDescriptionOnChange = (
    e: ChangeEvent<HTMLInputElement>,
  ) => {
    setArtworkDescription(e.target.value);
  };

  const handleArtworkFieldClick = (artworkField: string) => {
    setSelectedArtworkField(artworkField);

    if (!artworkTitle.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        artworkTitle: '필수 항목입니다.',
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        artworkTitle: '',
      }));
    }

    if (errors.selectedArtworkField) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        selectedArtworkField: '',
      }));
    }
  };

  const handlePrivacySettingChange = (
    newPrivacySetting: '전체공개' | '비공개',
  ) => {
    setPrivacySetting(newPrivacySetting);
  };

  const handleImageUpload = () => {
    // TODO: 실제 이미지 업로드 로직 구현
    setUploadedImage('uploaded-image-url'); // 테스트용

    if (errors.uploadedImage) {
      setErrors((prevErrors) => ({ ...prevErrors, uploadedImage: '' }));
    }
  };

  const validateArtworkUploadForm = () => {
    const newErrors: {
      artworkTitle?: string;
      selectedArtworkField?: string;
      uploadedImage?: string;
    } = {};

    if (!artworkTitle.trim()) newErrors.artworkTitle = '필수 항목입니다.';
    if (!selectedArtworkField.trim())
      newErrors.selectedArtworkField = '필수 항목입니다.';
    if (!uploadedImage) newErrors.uploadedImage = '이미지를 업로드해주세요.';
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    artworkTitle && selectedArtworkField && uploadedImage && !isSubmitting;

  const handleArtworkUpload = () => {
    if (!validateArtworkUploadForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setIsSubmitting(true);

    // TODO: 업로드 성공 시, 작성한 글 상세 페이지로 이동
    // [테스트용] 업로드 처리 (API 호출)
    setTimeout(() => {
      console.log('업로드 완료');
    }, 2000);
  };

  return (
    <div className='max-w-[1920px] m-auto px-[36px] py-[70px] lg:px-[140px]'>
      <h1>작품 업로드</h1>
      <div className='pt-[70px] pb-[30px] md:pb-[40px]'>
        <BasicInput
          type='text'
          label='작품 제목'
          placeholder='작품 제목을 입력하세요.'
          value={artworkTitle}
          onChange={handleArtworkTitleOnChange}
          showTextLength={true}
          maxLength={MAX_TITLE_LENGTH}
          isInvalid={!!errors.artworkTitle}
          errorMessage={errors.artworkTitle}
        />
      </div>
      <div className='flex flex-col md:flex-row items-start self-stretch gap-[38px] md:gap-[50px] pb-[78px]'>
        <FilterDropdown
          label='작품 카테고리'
          placeholder='카테고리 선택'
          options={ARTWORK_FIELDS.map((field) => field.name)}
          selected={selectedArtworkField}
          onChange={(value) => handleArtworkFieldClick(value)}
          isInvalid={!!errors.selectedArtworkField}
          errorMessage={errors.selectedArtworkField}
          className='w-full'
        />

        <FilterDropdown
          label='공개범위'
          options={PRIVACY_SETTING_OPTIONS.map((option) => option.name)}
          selected={privacySetting}
          onChange={() => handlePrivacySettingChange(privacySetting)}
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

          {errors.uploadedImage && (
            <div className='flex items-center mt-[3px] h-[26px]'>
              <Icon
                name='AlertCircle'
                size='s'
                className='text-system-error mr-2'
              />
              <p className='button-s text-system-error'>
                {errors.uploadedImage}
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

      <BasicInput
        type='textarea'
        label='작품 설명'
        placeholder='작품 설명을 입력하세요.'
        value={artworkDescription}
        onChange={handlertworkDescriptionOnChange}
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

        {/* hover:cursor-not-allowed */}
        <OvalButton
          variant={`${!isSubmitting && isFormValid ? 'primary' : 'secondary'}`}
          buttonSize='s'
          disabled={isSubmitting && !isFormValid}
          onClick={handleArtworkUpload}
        >
          업로드
        </OvalButton>
      </div>
    </div>
  );
};

export default ArtworkUpload;
