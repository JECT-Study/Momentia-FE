import { useQueryClient } from '@tanstack/react-query';
import { Dispatch, MouseEvent, SetStateAction, useEffect, useRef } from 'react';
import { useStore } from 'zustand';

import Icon from '@/components/Icon/Icon';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { USER } from '@/constants/API';
import useDeleteArtwork from '@/hooks/serverStateHooks/useDeleteArtwork';
import usePatchArtwork from '@/hooks/serverStateHooks/usePatchArtwork';
import modalStore from '@/stores/modalStore';

interface CardControllerProps {
  postId: number;
  currentStatus: 'PRIVATE' | 'PUBLIC';
  showOption: boolean;
  setShowOption: Dispatch<SetStateAction<boolean>>;
}

interface ClickAccessStatusButtonProps {
  event: MouseEvent<HTMLButtonElement>;
  status: 'PRIVATE' | 'PUBLIC';
}

const CardController = ({
  postId,
  currentStatus,
  showOption,
  setShowOption,
}: CardControllerProps) => {
  const queryClient = useQueryClient();
  const { openModal, closeModal } = useStore(modalStore);
  const { mutate: deleteArtwork } = useDeleteArtwork();
  const { mutate: changeAccessStatus } = usePatchArtwork();

  const wrapperRef = useRef<HTMLDivElement>(null);

  const toggleShowOption = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setShowOption((state) => !state);
  };

  const confirmDelete = () => {
    deleteArtwork(postId, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [USER.artworkList],
        });
        closeModal();
      },
    });
  };

  const clickAccessStatusButton = ({
    event,
    status,
  }: ClickAccessStatusButtonProps) => {
    event.stopPropagation();

    if (currentStatus != status) {
      changeAccessStatus(
        {
          postId,
          data: {
            status,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [USER.artworkList],
            });
            setShowOption((state) => !state);
          },
        },
      );
    }
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
    const handleClickOutside = (event: Event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowOption(false);
      }
    };

    const handleMouseLeave = () => {
      setShowOption(false);
    };

    if (showOption && wrapperRef.current) {
      document.addEventListener('click', handleClickOutside);
      wrapperRef.current.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
      if (wrapperRef.current) {
        wrapperRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [showOption]);

  return (
    <div ref={wrapperRef} onClick={toggleShowOption} className='cursor-pointer'>
      <Icon name='MoreVertical' size='l' />
      {
        <div
          className={`absolute top-0 left-0 w-full ${showOption ? 'h-full' : 'h-0'} transition-all duration-700 ease-in-out overflow-hidden`}
          onClick={toggleShowOption}
        >
          <div className='absolute top-0 right-0 flex flex-col gap-[15px] items-end w-[150px] px-[19px] py-[25px] bg-background-overlay rounded-tr-[5px] rounded-bl-[5px]'>
            <button
              type='button'
              className={`flex justify-between w-full text-gray-500 ${currentStatus === 'PUBLIC' && 'text-white'} text-end button-s py-1 hover:text-white`}
              onClick={(event) =>
                clickAccessStatusButton({ event, status: 'PUBLIC' })
              }
            >
              {currentStatus === 'PUBLIC' && <Icon name='Check' size='s' />}
              <p className='flex-1'>전체 공개</p>
            </button>
            <button
              type='button'
              className={`flex justify-between w-full text-gray-500 ${currentStatus === 'PRIVATE' && 'text-white'} text-end button-s py-1 hover:text-white`}
              onClick={(event) =>
                clickAccessStatusButton({ event, status: 'PRIVATE' })
              }
            >
              {currentStatus === 'PRIVATE' && <Icon name='Check' size='s' />}
              <p className='flex-1'>비공개</p>
            </button>
            <button
              type='button'
              className='w-full button-s mt-2.5 py-1 text-gray-500 text-end hover:text-white'
              onClick={clickDeleteButton}
            >
              삭제
            </button>
          </div>
        </div>
      }
    </div>
  );
};

export default CardController;
