import { ReactNode } from 'react';
import { useStore } from 'zustand';

import modalStore from '@/stores/modalStore';

import SquareButtonL from '../Button/SquareButtonL';

interface ConfirmModalProps {
  isButtonOnRow?: boolean;
  reverseButtonOrder?: boolean;
  children: ReactNode;
  confirmButtonText?: string;
  otherButtonText?: string;
  onClickConfirmButton?: () => void;
  onClickOtherButton?: () => void;
}

const ConfirmModal = ({
  isButtonOnRow = false,
  reverseButtonOrder = false,
  children,
  confirmButtonText = '확인',
  otherButtonText = '취소',
  onClickConfirmButton,
  onClickOtherButton,
}: ConfirmModalProps) => {
  const { closeModal } = useStore(modalStore);

  const handleConfirm = () => {
    closeModal();
    window.history.back();
  };

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
        <SquareButtonL
          variant='primary'
          onClick={onClickConfirmButton || handleConfirm}
        >
          <p>{confirmButtonText}</p>
        </SquareButtonL>
        <SquareButtonL
          variant='tertiary'
          onClick={onClickOtherButton || closeModal}
        >
          <p>{otherButtonText}</p>
        </SquareButtonL>
      </div>
    </div>
  );
};

export default ConfirmModal;
