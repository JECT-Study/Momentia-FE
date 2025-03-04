'use client';

import { AnimatePresence, motion } from 'framer-motion';

import useToastStore from '@/stores/useToastStore';

import Icon from '../Icon/Icon';

const SPACING = 48;

const ToastPopup = () => {
  const { toasts } = useToastStore();

  return (
    <div className='fixed top-10 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center'>
      <AnimatePresence>
        {toasts.map((toast, index) => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 10 + index * SPACING }}
            animate={{ opacity: 1, y: index * SPACING }}
            exit={{ opacity: 0, y: 10 + index * SPACING }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'absolute',
              top: index === 0 ? 0 : index * SPACING,
            }}
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
  );
};

export default ToastPopup;
