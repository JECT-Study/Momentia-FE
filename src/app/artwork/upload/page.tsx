'use client';

import { useState } from 'react';

import OvalButton from '@/components/Button/OvalButton';
import FilterDropdown from '@/components/FilterDropdown';
import Icon from '@/components/Icon/Icon';
import BasicInput from '@/components/Input/BasicInput';

const MAX_TITLE_LENGTH = 50;
const MAX_DESCRIPTION_LENGTH = 1000;

const PRIVACY_SETTING_OPTIONS = [
  {
    name: '전체공개',
    value: 'PUBLIC',
  },
  {
    name: '비공개',
    value: 'PRIVATE',
  },
];

const ARTWORK_FIELDS = [
  { name: '전체', value: 'ALL' },
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

interface ArtworkFilterProps {
  selectedArtworkField: string;
  setSelectedArtworkField: (value: string | ((prev: string) => string)) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string | ((prev: string) => string)) => void;
  setCurrentPage: (value: number | ((prev: number) => number)) => void;
}

interface ArtworkField {
  name: string;
  value: string;
}

const ArtworkUpload = () => {
  const [artworkTitle, setArtworkTitle] = useState('');
  const [selectedArtworkField, setSelectedArtworkField] = useState('');
  const [privacySetting, setPrivacySetting] = useState<'public' | 'private'>(
    'public',
  );
  const [artworkDescription, setArtworkDescription] = useState('');

  const handleArtworkTitleOnChange = (e: any) => {
    setArtworkTitle(e.target.value);
  };

  const selectedArtworkFieldName =
    ARTWORK_FIELDS.find((field) => field.value === selectedArtworkField)
      ?.name || '전체';

  const handleArtworkFieldClick = (artworkField: string) => {
    setSelectedArtworkField(artworkField);
  };

  const handlePrivacySettingChange = (
    newPrivacySetting: 'public' | 'private',
  ) => {
    setPrivacySetting(newPrivacySetting);
  };

  const handlertworkDescriptionOnChange = (e: any) => {
    setArtworkDescription(e.target.value);
  };

  return (
    <div className='max-w-[1920px] m-auto px-[36px] lg:px-[140px]'>
      <h1 className='py-[70px]'>작품 업로드</h1>
      <div className='pb-[40px]'>
        <BasicInput
          type='text'
          label='작품 제목'
          placeholder='작품 제목을 입력하세요.'
          value={artworkTitle}
          onChange={handleArtworkTitleOnChange}
          showTextLength={true}
          maxLength={MAX_TITLE_LENGTH}
          // isInvalid={!!errors.artworkTitle}
          // errorMessage={errors.artworkTitle?.message as string}
        />
      </div>
      <div className='flex items-start self-stretch gap-[50px] pb-[78px]'>
        <FilterDropdown
          label='작품 카테고리'
          placeholder='카테고리 선택'
          options={ARTWORK_FIELDS}
          selected={selectedArtworkField}
          onClick={() => handleArtworkFieldClick(artworkField.value)}
          className='w-full'
        />
        <FilterDropdown
          label='공개범위'
          options={PRIVACY_SETTING_OPTIONS}
          selected={privacySetting}
          onChange={() => handlePrivacySettingChange(privacySetting)}
          className='w-full'
        />
      </div>
      <div className='relative'>
        <div
          className='flex flex-col justify-center items-center gap-[15px] p-[140px] h-[853px]'
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
          <OvalButton variant='primary' buttonSize='s'>
            <Icon name='UploadShare' size='m' className='mr-2.5' />
            작품 업로드
          </OvalButton>
          <p className='button-s text-center text-gray-500'>
            작품 이미지는 1장만 업로드 가능합니다.
          </p>
        </div>
      </div>

      <div className='py-[70px]'>
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
            transition-all duration-300 ease-in-out active:scale-95'
          >
            취소
          </button>
          <OvalButton variant='primary' buttonSize='s'>
            업로드
          </OvalButton>
        </div>
      </div>
    </div>
  );
};

export default ArtworkUpload;
