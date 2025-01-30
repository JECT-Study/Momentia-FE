import { useMutation } from '@tanstack/react-query';
import { useStore } from 'zustand';

import postCreateCollection, {
  PostCreateColleactionProps,
} from '@/apis/collection/postCreateCollection';
import CollectionModal from '@/components/Modal/CollectionModal';
import modalStore from '@/stores/modalStore';

const usePostCreateCollection = () => {
  const { openModal, closeModal } = useStore(modalStore);

  const { mutate } = useMutation({
    mutationFn: ({ name, isPrivate }: PostCreateColleactionProps) =>
      postCreateCollection({ name, isPrivate }),
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
