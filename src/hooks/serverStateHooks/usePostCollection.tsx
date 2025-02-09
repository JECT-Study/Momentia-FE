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

const usePostCollection = () => {
  const { openModal, closeModal } = useStore(modalStore);
  const queryClient = useQueryClient();
  const isProfile = usePathname().includes('collection');

  const { mutate } = useMutation({
    mutationFn: ({ name, isPrivate }: PostCollectionProps) =>
      postCollection({ name, isPrivate }),
    onSuccess: () => {
      closeModal();

      openModal({
        modalSize: 'lg',
        contents: isProfile ? <CreateCollectionModal /> : <CollectionModal />,
      });

      if (isProfile) {
        queryClient.invalidateQueries({
          queryKey: [COLLECTION.collectionList],
        });
      }
    },
  });

  return { mutate };
};

export default usePostCollection;
