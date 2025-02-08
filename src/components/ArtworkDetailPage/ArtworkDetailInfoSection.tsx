'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useStore } from 'zustand';

import ROUTE from '@/constants/routes';
import useDeleteArtworkPost from '@/hooks/serverStateHooks/useDeleteArtworkPost';
import modalStore from '@/stores/modalStore';
import { ArtworkPostdetailInfoType } from '@/types';

import Icon from '../Icon/Icon';
import ConfirmModal from '../Modal/ConfirmModal';

interface ArtworkDetailInfoSectionProps {
  detailInfo: ArtworkPostdetailInfoType;
}

const ArtworkDetailInfoSection = ({
  detailInfo: { postId, userId, postImage, explanation, isMine },
}: ArtworkDetailInfoSectionProps) => {
  const router = useRouter();

  const { openModal, closeModal } = useStore(modalStore);
  const [showWiderArtwork, setShowWideArtwork] = useState(false);

  const { mutate: deleteArtwork } = useDeleteArtworkPost();

  const clickEditButton = () => {
    router.push(`${ROUTE.artworkUpload}?postId=${postId}`);
  };

  const confirmDelete = () => {
    deleteArtwork(postId, {
      onSuccess: () => {
        router.replace(ROUTE.artworkList);
        closeModal();
      },
    });
  };

  const clickDeleteButton = () => {
    openModal({
      modalSize: 'sm',
      contents: (
        <ConfirmModal
          onClickConfirmButton={confirmDelete}
          onClickOtherButton={closeModal}
          isButtonOnRow={false}
          reverseButtonOrder={true}
        >
          <p>
            작품을 삭제하시겠습니까?
            <br />
            삭제한 작품은 복구할 수 없습니다.
          </p>
        </ConfirmModal>
      ),
    });
  };

  useEffect(() => {
    if (showWiderArtwork) document.body.style.overflow = 'hidden';

    return () => {
      if (showWiderArtwork) document.body.style.overflow = 'auto';
    };
  }, [showWiderArtwork]);

  return (
    <div className='relative flex flex-col gap-10'>
      <div className='relative w-full h-[853px]'>
        <Image
          src={postImage}
          alt='post-image'
          fill={true}
          className='object-contain'
        />
        <button
          className='absolute bottom-[30px] right-[30px] tablet:p-[23.5px] p-[16.5px] rounded-full bg-background-overlay/50'
          onClick={() => setShowWideArtwork(true)}
        >
          <Icon
            name='ExternalLink'
            className='tablet:w-[30px] tablet:h-[30px]'
          />
        </button>
      </div>
      <div className='flex items-center gap-5 text-gray-600'>
        <Icon name='AlertCircle' size='m' />
        <p>
          모멘티아에 게시된 모든 작품의 이미지 및 콘텐츠는 저작권법에 의해
          보호받고 있으며 무단 복제, 배포, 사용 시 법적 책임이 따를 수 있습니다.
        </p>
      </div>
      <div className='flex flex-col gap-5'>
        <div className='flex justify-between'>
          <h2>작품 설명</h2>
          {isMine && (
            <div className='flex gap-[30px]'>
              <button onClick={clickEditButton}>수정</button>
              <button onClick={clickDeleteButton}>삭제</button>
            </div>
          )}
        </div>
        <div className='min-h-[256px] p-5 rounded-[10px] bg-gray-900'>
          <p>{explanation}</p>
        </div>
      </div>
      {showWiderArtwork && (
        <div className='fixed left-0 top-0 w-full h-full bg-black/80 z-50 py-[111px]'>
          <button
            className='absolute right-[138px] top-[15px] p-[23px] bg-background-overlay/80 rounded-full'
            onClick={() => setShowWideArtwork(false)}
          >
            <Icon name='Close' size='l' />
          </button>
          <div className='relative w-full h-full'>
            <Image
              src={postImage}
              alt='post-image'
              fill={true}
              className='object-contain'
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtworkDetailInfoSection;
