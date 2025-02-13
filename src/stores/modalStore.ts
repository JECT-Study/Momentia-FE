import { create } from 'zustand';

interface ModalAction {
  openModal: (props: OpenModalProps) => void;
  closeModal: () => void;
}

interface ModalState {
  isOpen: boolean;

  modalSize: 'xs' | 'sm' | 'md' | 'lg';
  contents: React.ReactNode;
}

type OpenModalProps = Pick<ModalState, 'contents'> &
  Partial<Omit<ModalState, 'isOpen' | 'contents'>>;

const initialModalState: ModalState = {
  isOpen: false,
  modalSize: 'md',
  contents: null,
};

const modalStore = create<ModalState & ModalAction>((set) => ({
  ...initialModalState,

  openModal: (props: OpenModalProps) =>
    set((state) => {
      if (state.isOpen) return state;

      return { ...state, isOpen: true, ...props };
    }),
  closeModal: () =>
    set((state) => {
      if (!state.isOpen) return state;

      return { ...initialModalState };
    }),
}));

export default modalStore;
