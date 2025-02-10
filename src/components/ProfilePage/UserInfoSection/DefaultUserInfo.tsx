import Image from 'next/image';
import { useStore } from 'zustand';

import DefaultProfile from '@/../public/images/defaultProfileImage.png';
import FollowButton from '@/components/Button/FollowButton';
import OvalButton from '@/components/Button/OvalButton';
import FollowInfoModal from '@/components/Modal/FollowInfoModal';
import modalStore from '@/stores/modalStore';
import { UserType } from '@/types/user';

interface DefaultUserInfoProps extends UserType {
  changeMode: () => void;
}

const DefaultUserInfo = ({
  changeMode,
  userId,
  profileImage,
  nickname,
  isMine,
  isFollow,
  userField,
  introduction,
  followerCount,
  followingCount,
}: DefaultUserInfoProps) => {
  const { openModal } = useStore(modalStore);

  const clickFollowInfo = (type: 'follower' | 'following') => {
    openModal({
      modalSize: 'lg',
      contents: <FollowInfoModal type={type} nickname={nickname} />,
    });
  };

  return (
    <div>
      <div className='relative flex flex-col mobile:flex-row mobile:gap-[95px] gap-[30px] items-center mobile:items-start'>
        <div className='w-[141px]'>
          <Image
            src={profileImage || DefaultProfile}
            alt={profileImage ? 'user-profile-image' : 'default-profile'}
            className={'rounded-full mb-[30px] mobile:mb-[40px]'}
            width={141}
            height={141}
          />
          {isMine ? (
            <OvalButton
              buttonSize='s'
              variant='primary'
              onClick={changeMode}
              className='w-full mobile:block hidden'
            >
              프로필 수정
            </OvalButton>
          ) : (
            <FollowButton
              initFollowState={isFollow}
              followUserId={userId}
              isFull={true}
            />
          )}
        </div>
        <div className='relative flex-1 flex flex-col items-center mobile:items-start'>
          <h3 className='mb-[43px] mobile:mb-[29px]'>{nickname}</h3>
          <div className='mb-10'>
            <p className='subtitle1 mb-[15px] mobile:mb-[25px] text-center mobile:text-start'>
              {userField || '없음'}
            </p>
            <p className='subtitle2'>
              {introduction}
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa
              cumque, alias voluptatem quos repellat rem aliquam reprehenderit
              quam ullam provident placeat veniam! Praesentium consequatur
              doloribus nostrum. Illum asperiores similique doloribus!
            </p>
            {isMine && (
              <OvalButton
                buttonSize='s'
                variant='primary'
                onClick={changeMode}
                className='w-full mobile:hidden mt-[30px]'
              >
                프로필 수정
              </OvalButton>
            )}
          </div>
          <div className='static tablet:absolute top-0 right-0 flex gap-10'>
            <button
              type='button'
              className={
                'flex gap-2.5 px-[28.5px] py-[12.5px] bg-gray-900 rounded-5px button-m'
              }
              onClick={() => clickFollowInfo('follower')}
            >
              <p>팔로워</p>
              <p>{followerCount}</p>
            </button>
            <button
              type='button'
              className={
                'flex gap-2.5 px-[28.5px] py-[12.5px] bg-gray-900 rounded-[5px] button-m'
              }
              onClick={() => clickFollowInfo('following')}
            >
              <p>팔로잉</p>
              <p>{followingCount}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultUserInfo;
