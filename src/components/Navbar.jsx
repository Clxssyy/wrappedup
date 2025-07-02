'use client';

import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { BsBoxArrowRight } from 'react-icons/bs';

const Navbar = () => {
  const { data: session } = useSession();
  const currentPage = usePathname();
  const name = session?.user.name;

  if (session) {
    return (
      <nav className='bg-zinc-800 text-white flex place-items-center'>
        <div className='p-4'>
          <Link href='/' className='text-2xl font-bold'>
            Wrapped
            <span className='spotify-green'>Up</span>
          </Link>
        </div>
        <div className='grow p-4'>
          <div id='linkContainer' className='flex gap-2'>
            <Link
              href='/songs'
              className={
                currentPage === '/songs' ? 'activePage relative' : 'relative'
              }>
              Songs
              <span className='customUnderline'></span>
            </Link>
            <Link
              href='/playlists'
              className={
                currentPage === '/playlists'
                  ? 'activePage relative'
                  : 'relative'
              }>
              Playlists
              <span className='customUnderline'></span>
            </Link>
            <Link
              href={'/user/' + name}
              className={
                currentPage === '/user/' + name
                  ? 'activePage relative'
                  : 'relative'
              }>
              Profile
              <span className='customUnderline'></span>
            </Link>
          </div>
        </div>
        <div className='p-4'>
          <button
            onClick={() => signOut()}
            className='rounded-full hover:bg-zinc-400 hover:opacity-50 text-white p-2'
            aria-label='Sign Out'>
            <BsBoxArrowRight />
          </button>
        </div>
      </nav>
    );
  } else {
    return (
      <nav className='p-4 bg-zinc-800 text-white'>
        <div className='flex justify-between place-items-center'>
          <p className='text-2xl font-bold'>
            Wrapped
            <span className='spotify-green'>Up</span>
          </p>
          <Link href='/login'>Login</Link>
        </div>
      </nav>
    );
  }
};

export default Navbar;
