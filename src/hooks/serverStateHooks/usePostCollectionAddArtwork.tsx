import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from 'zustand';

import postCollectionAddArtwork from '@/apis/collection/postCollectionAddArtwork';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import ROUTE from '@/constants/routes';
import modalStore from '@/stores/modalStore';

const usePostCollectionAddArtwork = () => {
  const router = useRouter();
  const { openModal, closeModal } = useStore(modalStore);

  const searchParams = useSearchParams();
  const artworkId = Number(searchParams.get('postId'));

  const { mutate } = useMutation({
    mutationFn: (collectionId: number) =>
      postCollectionAddArtwork({ collectionId, postId: artworkId }),
    onSuccess: (_, variables) => {
      closeModal();

      openModal({
        modalSize: 'sm',
        contents: (
          <ConfirmModal
            otherButtonText='컬렉션으로 이동'
            onClickOtherButton={() => {
              router.push(`${ROUTE.collection}?collectionId=${variables}`);
              closeModal();
            }}
          >
            <p className='body1'>작품이 컬렉션에 저장되었습니다.</p>
          </ConfirmModal>
        ),
      });
    },
  });

  return { mutate };
};

export default usePostCollectionAddArtwork;
