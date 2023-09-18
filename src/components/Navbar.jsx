'use client';

import { signOut, useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <nav className='p-4 bg-zinc-800 text-white place-items-center'>
        <div className='flex justify-between place-items-center'>
          <h1 className='text-2xl font-bold'>
            Wrapped
            <span className='spotify-green'>Up</span>
          </h1>
          <div>
            <a href='/songs'>Songs</a>
          </div>
          <button onClick={() => signOut()}>Sign out</button>
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
