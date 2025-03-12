import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import { useStore } from 'zustand';

import postCollection, {
  PostCollectionProps,
} from '@/apis/collection/postCollection';
import CollectionModal from '@/components/Modal/CollectionModal';
import CreateCollectionModal from '@/components/Modal/CreateCollectionModal';
import { COLLECTION } from '@/constants/API';
import modalStore from '@/stores/modalStore';
import useToastStore from '@/stores/useToastStore';

const usePostCollection = () => {
  const queryClient = useQueryClient();
  const isProfile = usePathname().includes('profile');

  const { openModal, closeModal } = useStore(modalStore);
  const { showToast } = useToastStore();

  const { mutate } = useMutation({
    mutationFn: ({ name, isPrivate }: PostCollectionProps) =>
      postCollection({ name, isPrivate }),

    onSuccess: () => {
      closeModal();
      showToast('success', '컬렉션이 생성되었습니다.');

      openModal({
        modalSize: isProfile ? 'md' : 'lg',
        contents: isProfile ? <CreateCollectionModal /> : <CollectionModal />,
      });

      if (isProfile) {
        queryClient.invalidateQueries({
          queryKey: [COLLECTION.collectionList],
        });
      }
    },

    onError: (error) => {
      if (error instanceof Error) {
        if (error.message === '이미 존재하는 컬렉션 이름입니다.') {
          showToast('error', error.message);
        } else {
          console.error(error.message);
        }
      }
    },
  });

  return { mutate };
};

export default usePostCollection;
