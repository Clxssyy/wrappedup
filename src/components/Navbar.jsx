'use client';

import { signOut, useSession } from 'next-auth/react';
import { BsBoxArrowRight } from 'react-icons/bs';

const Navbar = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <nav className='bg-zinc-800 text-white flex place-items-center'>
        <div className='p-4'>
          <h1 className='text-2xl font-bold'>
            Wrapped
            <span className='spotify-green'>Up</span>
          </h1>
        </div>
        <div className='grow flex justify-center p-4'>
          <div className='h-full'>
            <a href='/songs'>Songs</a>
          </div>
        </div>
        <div className='p-4'>
          <button
            onClick={() => signOut()}
            className='rounded-full hover:bg-zinc-400 hover:opacity-50 text-white p-2'
          >
            <BsBoxArrowRight />
          </button>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className='p-4 bg-zinc-800 text-white place-items-center'>
        <div className='flex justify-between place-items-center'>
          <p className='text-2xl font-bold'>
            Wrapped
            <span className='spotify-green'>Up</span>
          </p>
          <a href='/login'>Login</a>
        </div>
      </nav>
    );
  }
};

export default Navbar;
