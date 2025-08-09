'use client'

import React, { useEffect } from 'react';
import { useRouter }        from 'next/navigation';
import Center               from '@component/Layout/Center';
import IconLoadingBar from '@component/SvgsIcons/IconLoadingBar';


const Body = () => {

  const router = useRouter()

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push('/Home'); 
    }, 500); 
    return () => clearTimeout(timeout);
  }, [router])

  return (
    <div className='fixed top-0 left-0 w-screen h-screen bg-[#F9FAFB] flex items-center justify-center'>
      <Center className='animate-pulse'>
        <div role="status">
          <IconLoadingBar />
          <span className="sr-only">Carregando...</span>
        </div>
      </Center>
    </div>
  );
};

export default Body;
