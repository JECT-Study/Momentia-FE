import { ReactNode } from 'react';
import { useStore } from 'zustand';

import modalStore from '@/stores/modalStore';

import SquareButtonL from '../Button/SquareButtonL';

interface ConfirmModalProps {
  isButtonOnRow?: boolean;
  reverseButtonOrder?: boolean;
  children: ReactNode;
}

const ConfirmModal = ({
  isButtonOnRow = false,
  reverseButtonOrder = false,
  children,
}: ConfirmModalProps) => {
  const { closeModal } = useStore(modalStore);

  const buttonOrderClassName = isButtonOnRow
    ? reverseButtonOrder
      ? 'flex-row-reverse'
      : 'flex-row'
    : reverseButtonOrder
      ? 'flex-col-reverse'
      : 'flex-col';

  return (
    <div className='px-[40px] py-[50px] text-center'>
      <div className='body1 text-white mb-[50px]'>{children}</div>
      <div className={`flex ${buttonOrderClassName} gap-[20px]`}>
        <SquareButtonL variant='primary'>
          <p>확인</p>
        </SquareButtonL>
        <SquareButtonL variant='tertiary' onClick={closeModal}>
          <p>취소</p>
        </SquareButtonL>
      </div>
    </div>
  );
};

export default ConfirmModal;
