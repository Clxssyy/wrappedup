'use client';

import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Songs() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [songs, setSongs] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMySavedTracks({ offset: page * 20 }).then((data) => {
        setSongs(data.body.items);
      });
    }
  }, [session, spotifyApi, page]);

  return (
    <section className='bg-zinc-900 grow'>
      <div className='flex flex-col p-4 gap-2 justify-center place-items-center'>
        <div className='flex gap-2'>
          <button
            onClick={() => {
              setPage(() => {
                if (page == 0) return 0;
                else return page - 1;
              });
            }}
            className='rounded-full bg-zinc-400'
          >
            prev
          </button>
          <h2 className='text-white'>Page</h2>
          <button
            onClick={() => {
              setPage(page + 1);
            }}
            className='rounded-full bg-zinc-400'
          >
            next
          </button>
        </div>
        <div className='w-full'>
          {songs.map((song) => (
            <div
              className='border-b border-black bg-zinc-800 p-2 flex gap-2 place-items-center'
              key={song.track.name}
            >
              <p className='text-zinc-400'>
                {song.track.name} -{' '}
                <span className='text-sm'>{song.track.artists[0].name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}