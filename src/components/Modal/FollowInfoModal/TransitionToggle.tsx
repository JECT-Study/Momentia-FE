import '@/styles/shadow.css';

import { Dispatch, SetStateAction } from 'react';
import { useStore } from 'zustand';

import Icon from '@/components/Icon/Icon';
import modalStore from '@/stores/modalStore';

interface TransitionToggleProps {
  followType: 'follower' | 'following';
  setFollowType: Dispatch<SetStateAction<'follower' | 'following'>>;
}

const TransitionToggle = ({
  followType,
  setFollowType,
}: TransitionToggleProps) => {
  const { closeModal } = useStore(modalStore);

  const selectedTabClassName =
    'absolute inset-0 bg-background-overlay transition-transform duration-500 ease-in-out';
  const defaultTabClassName =
    'flex-1 px-5 py-2.5 rounded-[10px] relative overflow-hidden text-gray-500';

  const clickTabButton = (value: 'follower' | 'following') => {
    if (value !== followType) setFollowType(value);
  };

  return (
    <div>
      <div className='flex gap-3 w-[223px] tablet:w-[282px] m-auto p-2.5 rounded-2xl bg-gray-900 text-gray-500'>
        <button
          type='button'
          onClick={() => clickTabButton('follower')}
          className={`
            ${defaultTabClassName}
            ${followType === 'follower' ? 'text-white' : ''}
          `}
        >
          <span
            className={`
              ${selectedTabClassName}
              ${followType === 'follower' ? 'translate-x-0' : 'translate-x-full'}
            `}
          ></span>
          <span className='relative z-10'>팔로워</span>
        </button>

        <button
          type='button'
          onClick={() => clickTabButton('following')}
          className={`
            ${defaultTabClassName}
            ${followType === 'following' ? 'text-white' : ''}
          `}
        >
          <span
            className={`
              ${selectedTabClassName}
              ${followType === 'following' ? 'translate-x-0' : '-translate-x-full'}
            `}
          ></span>
          <span className='relative z-10'>팔로잉</span>
        </button>
      </div>
      <Icon
        name='Close'
        size='l'
        className='absolute top-[45px] right-[45px] text-gray-500 hidden tablet:block'
        onClick={closeModal}
      />
      <Icon
        name='Close'
        size='m'
        className='absolute top-[23px] right-[23px] text-gray-500 tablet:hidden'
        onClick={closeModal}
      />
    </div>
  );
};
export default TransitionToggle;
