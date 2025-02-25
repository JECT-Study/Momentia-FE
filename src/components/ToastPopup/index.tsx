'use client';

import { AnimatePresence, motion } from 'framer-motion';

import useToastStore from '@/stores/useToastStore';

import Icon from '../Icon/Icon';

const SPACING = 3;

const ToastPopup = () => {
  const { toasts } = useToastStore();

  return toasts.length ? (
    <div className='fixed top-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center space-y-2'>
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 10 + index * SPACING }}
            animate={{ opacity: 1, y: index * SPACING }}
            exit={{ opacity: 0, y: 10 + index * SPACING }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className='button-m text-white bg-background-overlay
            w-[366px] mobile:w-[698px] tablet:w-[916px] p-[30px] rounded-[10px]
            shadow-md flex items-center'
          >
            {toast.type === 'error' ? (
              <Icon
                name='AlertCircle'
                size='l'
                className='text-system-error mr-7 shrink-0'
              />
            ) : (
              <Icon
                name='CheckCircleFilled'
                size='l'
                className='text-system-success mr-7 shrink-0'
              />
            )}
            <p>{toast.message}</p>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  ) : null;
};

export default ToastPopup;
