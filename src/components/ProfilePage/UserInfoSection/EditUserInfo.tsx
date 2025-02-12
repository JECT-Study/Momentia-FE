'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { ChangeEvent, useMemo, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import OvalButton from '@/components/Button/OvalButton';
import Icon from '@/components/Icon/Icon';
import BasicInput from '@/components/Input/BasicInput';
import SortDropdown from '@/components/SortDropdown';
import ARTWORK_FIELDS from '@/constants/artworkFields';
import usePatchProfileInfo, {
  UsePatchProfileInfoProps,
} from '@/hooks/serverStateHooks/usePatchProfileInfo';
import { UserStringProfileType, UserType } from '@/types/user';

const USER_INFO_SCHEMA = z.object({
  nickname: z.string().min(1, '닉네임을 입력해주세요.'),
  introduction: z.string().min(1, '자기 소개를 입력해주세요.'),
  userField: z.string().optional(),
  profileImage: z.union([z.string(), z.instanceof(File)]).optional(),
});

const MAX_NICKNAME_LENGTH = 10;
const MAX_INTRODUCTION_LENGTH = 60;

type UserInfoFormData = z.infer<typeof USER_INFO_SCHEMA>;

interface EditUserInfoProps extends UserType {
  changeMode: () => void;
}

const EditUserInfo = ({
  changeMode,
  profileImage,
  nickname,
  introduction,
  userField,
}: EditUserInfoProps) => {
  const imageUploadRef = useRef<HTMLInputElement | null>(null);
  const { updateUserProfile } = usePatchProfileInfo();

  const {
    trigger,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<UserInfoFormData>({
    resolver: zodResolver(USER_INFO_SCHEMA),
    mode: 'all',
    defaultValues: {
      nickname,
      introduction,
      userField,
      profileImage,
    },
  });

  const currentProfileImage = watch('profileImage');

  const changeImage = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue('profileImage', file, { shouldValidate: true });
    }
  };

  const changeNickname = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('nickname', event.target.value);
    trigger('nickname');
  };

  const changeIntroduction = (event: ChangeEvent<HTMLInputElement>) => {
    setValue('introduction', event.target.value);
    trigger('introduction');
  };

  const convertedProfileImage = useMemo(() => {
    if (currentProfileImage instanceof File)
      return URL.createObjectURL(currentProfileImage);
    if (typeof currentProfileImage === 'string') return currentProfileImage;
    return '/images/defaultProfileImage.png';
  }, [currentProfileImage]);

  const onSubmit = (data: UserInfoFormData) => {
    const newProfileData = {
      updateInfo: {} as UserStringProfileType,
    } as UsePatchProfileInfoProps;

    if (data.nickname !== nickname)
      newProfileData.updateInfo.nickname = data.nickname;
    if (data.introduction !== introduction)
      newProfileData.updateInfo.introduction = data.introduction;
    if (data.userField !== userField) {
      const selectedField = ARTWORK_FIELDS.find(
        (field) => field.name === data.userField,
      );
      newProfileData.updateInfo.userField = selectedField?.value;
    }

    if (data.profileImage instanceof File) {
      newProfileData.imageFile = data.profileImage;
    }

    updateUserProfile(newProfileData, {
      onSuccess: () => {
        alert('프로필이 성공적으로 업데이트되었습니다!');
        changeMode();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col mobile:flex-row gap-[35px] mobile:gap-[70px] items-center mobile:items-start justify-center'
    >
      <button
        type='button'
        className='relative w-fit'
        onClick={() => imageUploadRef.current?.click()}
      >
        <Image
          src={convertedProfileImage}
          alt='user-profile-image'
          className={'rounded-full w-[141px] h-[141px]'}
          width={141}
          height={141}
        />
        <div className='absolute right-[3px] bottom-[-6px] w-fit p-4 bg-background-overlay/50 rounded-full backdrop-blur-md'>
          <Icon name='EditPencil' className='text-white' />
        </div>
        <input
          type='file'
          accept='image/*'
          ref={imageUploadRef}
          className='hidden'
          onChange={changeImage}
        />
      </button>

      <div className='flex-1 w-full'>
        <div className='flex flex-col mobile:flex-row mobile:items-center items-end mobile:gap-[70px] gap-[15px] pb-[15px]'>
          <BasicInput
            onChange={changeNickname}
            value={watch('nickname') || ''}
            label='닉네임'
            placeholder='닉네임을 입력하세요'
            className='w-full'
            isInvalid={!!errors.nickname}
            errorMessage={errors.nickname?.message}
            showTextLength={true}
            maxLength={MAX_NICKNAME_LENGTH}
          />

          <span className='w-full mb-[38px]'>
            <SortDropdown
              label='작품 카테고리'
              placeholder='카테고리 선택'
              options={ARTWORK_FIELDS.map((field) => field.name)}
              selected={watch('userField') || 'OTHERS'}
              onChange={(value) => setValue('userField', value)}
              className='w-full'
            />
          </span>
        </div>

        <BasicInput
          onChange={changeIntroduction}
          value={watch('introduction') || ''}
          label='한 줄 소개'
          placeholder='한 줄 소개를 입력하세요'
          className='w-full'
          isInvalid={!!errors.introduction}
          errorMessage={errors.introduction?.message}
          showTextLength={true}
          maxLength={MAX_INTRODUCTION_LENGTH}
        />

        <div className='flex flex-col-reverse mobile:flex-row gap-2.5 justify-end mt-9'>
          <OvalButton
            buttonSize='s'
            variant='tertiary'
            className='bg-transparent py-[20px] px-[34px] leading-none'
            onClick={changeMode}
          >
            취소
          </OvalButton>
          <OvalButton
            buttonSize='s'
            variant='primary'
            className='py-[20px] px-[34px] leading-none'
            type='submit'
            disabled={!isValid}
          >
            완료
          </OvalButton>
        </div>
      </div>
    </form>
  );
};

export default EditUserInfo;
