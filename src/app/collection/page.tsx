'use client';

const Collection = () => {
  return (
    <div className='pt-[50px] px-[32px] md:px-[140px]'>
      {artworks.length === 0 && (
        <div className='py-[70px]'>
          <div className='body1 text-gray-500 py-[185px] md:py-[620px] text-center'>
            아직 작품이 없어요.
          </div>
        </div>
      )}
    </div>
  );
};

export default Collection;
