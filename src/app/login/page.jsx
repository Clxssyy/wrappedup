'use client'

import { signIn } from 'next-auth/react';
import Image from 'next/image';

export default function Login() {
  return (
    <>
      <section className='grow flex flex-col gap-2 place-items-center justify-center bg-zinc-900'>
        <Image
          src='spotify_icon.svg'
          alt='Spotify Logo'
          width={200}
          height={200}
        />
        <button className='bg-green-500 p-2 rounded-lg text-lg' onClick={() => signIn("spotify", { callbackUrl: '/' })}>
          Sign in with Spotify
        </button>
      </section>
    </>
  );
}
