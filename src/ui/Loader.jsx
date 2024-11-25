import React from 'react';

export default function Loader() {
  return (
    <div className='absolute inset-0 bg-gray-500/20 h-[100%] grid place-content-center backdrop-blur-sm'>
      <div className='loader'></div>
    </div>
  );
}
