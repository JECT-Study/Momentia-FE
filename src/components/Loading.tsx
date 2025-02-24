'use client';

import Lottie from 'lottie-react';

import loadingData from '@/../public/loading.json';

interface LoadingProps {
  width?: number;
  height?: number;
}

const Loading = ({ width = 150, height = 100 }: LoadingProps) => {
  return (
    <div
      style={{ width: `${width}px`, height: `${height}px` }}
      className='flex justify-center items-center'
    >
      <Lottie
        animationData={loadingData}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Loading;
