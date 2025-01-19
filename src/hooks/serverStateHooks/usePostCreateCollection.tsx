import { useMutation } from '@tanstack/react-query';
import { useStore } from 'zustand';

import postCreateCollection from '@/apis/collection/postCreateCollection';
import CollectionModal from '@/components/Modal/CollectionModal';
import { COLLECTION } from '@/constants/API';
import modalStore from '@/stores/modalStore';

const usePostCreateCollection = () => {
  const { openModal, closeModal } = useStore(modalStore);
  const { mutate } = useMutation({
    mutationKey: [COLLECTION.collection],
    mutationFn: ({ name, isPrivate }: { name: string; isPrivate: boolean }) =>
      postCreateCollection(name, isPrivate),
    onSuccess: () => {
      closeModal();

      openModal({
        modalSize: 'lg',
        contents: <CollectionModal />,
      });
    },
  });

  return { mutate };
};

export default usePostCreateCollection;
