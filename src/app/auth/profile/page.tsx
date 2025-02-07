import Icon from '../../../components/Icon/Icon';

const Profile = () => {
  return (
    <div className='pt-[50px] px-[140px]'>
      <div className='flex justify-between items-center'>
        <button className='button-m'>
          <Icon name='Plus' size='m' className='mr-[10px]' />
          컬렉션 생성
        </button>
        <div>드롭다운</div>
      </div>
    </div>
  );
};

export default Profile;
