'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import ArtistInfoSection from '@/components/ArtworkDetailPage/ArtistInfoSection';
import ArtworkCommentSection from '@/components/ArtworkDetailPage/ArtworkCommentSection';
import ArtworkDetailHeader from '@/components/ArtworkDetailPage/ArtworkDetailHeader';
import ArtworkDetailInfoSection from '@/components/ArtworkDetailPage/ArtworkDetailInfoSection';
import ButtonGroup from '@/components/ArtworkDetailPage/ButtonGroup';
import useGetArtworkPost from '@/hooks/serverStateHooks/useGetArtworkPost';

const ArtworkDetailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const postId = Number(searchParams.get('postId'));

  const { headerInfo, socialInfo, detailInfo, artistInfo, isLoading } =
    useGetArtworkPost(postId);

  useEffect(() => {
    if (!postId) router.back();
  }, [postId]);

  if (isLoading || !headerInfo || !socialInfo || !detailInfo || !artistInfo)
    return <div>Loading</div>;
  return (
    <div className='relative flex flex-col gap-[60px] w-full max-w-[1920px] m-auto py-[70px] tablet:px-[140px] px-[32px]'>
      <ArtworkDetailHeader headerInfo={headerInfo} />
      <div className='relative flex flex-col tablet:gap-[40px] gap-[30px]'>
        <ArtworkDetailInfoSection detailInfo={detailInfo} />
        <ButtonGroup socialInfo={socialInfo} />
        <div className='flex tablet:flex-row flex-col tablet:gap-10 gap-[70px] mt-10'>
          <ArtistInfoSection artistInfo={artistInfo} />
          <ArtworkCommentSection postId={postId} />
        </div>
      </div>
    </div>
  );
};

export default ArtworkDetailPage;
