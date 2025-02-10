import '@/styles/scroll.css';

import { useState } from 'react';

import FollowerList from './FollowerList';
import FollowingList from './FollowingList';
import TransitionToggle from './TransitionToggle';

interface FollowInfoModalProps {
  type: 'follower' | 'following';
  nickname: string;
}

const FollowInfoModal = ({ type, nickname }: FollowInfoModalProps) => {
  const [followType, setFollowType] = useState<'follower' | 'following'>(type);

  return (
    <div className='relative flex flex-col gap-[25px] py-[23px] tablet:pt-[46px]'>
      <TransitionToggle followType={followType} setFollowType={setFollowType} />
      <div className='pl-[26px] tablet:pl-[103px]'>
        {followType === 'follower' ? (
          <FollowerList nickname={nickname} />
        ) : (
          <FollowingList nickname={nickname} />
        )}
      </div>
    </div>
  );
};

export default FollowInfoModal;
