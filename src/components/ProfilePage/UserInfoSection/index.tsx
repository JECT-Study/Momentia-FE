'use client';

import { useState } from 'react';

import { UserType } from '@/types/user';

import DefaultUserInfo from './DefaultUserInfo';
import EditUserInfo from './EditUserInfo';

const UserInfoSection = ({ userInfo }: { userInfo: UserType }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditMode = () => setIsEditing((state) => !state);

  const userNameText = userInfo.isMine ? '나' : userInfo.nickname;

  return (
    <div>
      <h2 className='mb-[70px] mobile:mb-[50px]'>{userNameText}의 모멘티아</h2>
      {isEditing ? (
        <EditUserInfo toggleEditMode={toggleEditMode} {...userInfo} />
      ) : (
        <DefaultUserInfo toggleEditMode={toggleEditMode} {...userInfo} />
      )}
    </div>
  );
};

export default UserInfoSection;
