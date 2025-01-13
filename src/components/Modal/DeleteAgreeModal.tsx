import { useStore } from 'zustand';

import modalStore from '@/stores/modalStore';

import SquareButtonL from '../Button/SquareButtonL';

const DeleteaAgreeModal = () => {
  const { closeModal } = useStore(modalStore);

  return (
    <div className='px-[40px] py-[50px] text-center'>
      <div className='body1 text-white mb-[50px]'>
        <p>작품을 삭제하시겠습니까?</p>
        <p>삭제한 작품은 복구할 수 없습니다.</p>
      </div>
      <div className='flex flex-col gap-[20px]'>
        <SquareButtonL variant='primary'>
          <p>확인</p>
        </SquareButtonL>
        <SquareButtonL variant='tertiaty' onClick={closeModal}>
          <p>취소</p>
        </SquareButtonL>
      </div>
    </div>
  );
};

export default DeleteaAgreeModal;
