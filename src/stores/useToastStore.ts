import { create } from 'zustand';

type ToastMessage = {
  id: number;
  type: 'success' | 'error';
  message: string;
};

type ToastStore = {
  toasts: ToastMessage[];
  showToast: (type: 'success' | 'error', message: string) => void;
};

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],

  showToast: (type, message) => {
    const id = Date.now();
    set((state) => ({ toasts: [...state.toasts, { id, type, message }] }));

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 2400);
  },
}));

export default useToastStore;
