import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { useStore } from 'zustand';

import postCollectionAddArtwork from '@/apis/collection/postCollectionAddArtwork';
import ConfirmModal from '@/components/Modal/ConfirmModal';
import { COLLECTION } from '@/constants/API';
import modalStore from '@/stores/modalStore';

const usePostCollectionAddArtwork = ({
  collectionId,
}: {
  collectionId: number;
}) => {
  const router = useRouter();
  const { openModal, closeModal } = useStore(modalStore);

  const searchParams = useSearchParams();
  const artworkId = Number(searchParams.get('artworkId'));

  const { mutate } = useMutation({
    mutationKey: [COLLECTION.collectionAddArtwork(collectionId, artworkId)],
    mutationFn: () =>
      postCollectionAddArtwork({ collectionId, postId: artworkId }),
    onSuccess: () => {
      console.log(111);
      closeModal();

      openModal({
        modalSize: 'sm',
        contents: (
          <ConfirmModal
            otherButtonText='컬렉션으로 이동'
            onClickOtherButton={() => {
              router.push('/collections');
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
