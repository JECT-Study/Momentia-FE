import { useMutation } from '@tanstack/react-query';
import { useStore } from 'zustand';

import postCollection, {
  PostCreateColleactionProps,
} from '@/apis/collection/postCollection';
import CollectionModal from '@/components/Modal/CollectionModal';
import modalStore from '@/stores/modalStore';

const usePostCollection = () => {
  const { openModal, closeModal } = useStore(modalStore);

  const { mutate } = useMutation({
    mutationFn: ({ name, isPrivate }: PostCreateColleactionProps) =>
      postCollection({ name, isPrivate }),
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

export default usePostCollection;
