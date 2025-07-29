'use client';
import { useEffect, useState } from 'react';
import {
  BsChevronDoubleLeft,
  BsChevronDoubleRight,
  BsChevronLeft,
  BsChevronRight,
} from 'react-icons/bs';
import useSpotify from '@/hooks/useSpotify';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function Playlists() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getUserPlaylists().then((data) => {
        if (data.body.items.length == 0) {
          setPage(page - 1);
          return;
        }
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyApi, page]);

  if (!session) redirect('/');

  return (
    <section className='bg-zinc-900 grow text-white'>
      <div className='flex flex-col p-4 gap-2 justify-center place-items-center'>
        <div className='flex gap-4 place-items-center'>
          <div>
            <button
              onClick={() => setPage(0)}
              className={
                page !== 0
                  ? 'rounded-full hover:bg-zinc-400 hover:opacity-50 text-white p-2'
                  : 'hidden'
              }
              aria-label='First Page'>
              <BsChevronDoubleLeft />
            </button>
            <button
              onClick={() => {
                setPage(() => {
                  if (page == 0) return 0;
                  else return page - 1;
                });
              }}
              className='rounded-full hover:bg-zinc-400 hover:opacity-50 text-white p-2'
              aria-label='Previous Page'>
              <BsChevronLeft />
            </button>
          </div>
          <h2 className='text-white text-m font-bold'>Page</h2>
          <div>
            <button
              onClick={() => {
                setPage(page + 1);
              }}
              className='rounded-full hover:bg-zinc-400 hover:opacity-50 text-white p-2'
              aria-label='Next Page'>
              <BsChevronRight />
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className='rounded-full hover:bg-zinc-400 hover:opacity-50 text-white p-2'
              aria-label='Last Page'>
              <BsChevronDoubleRight />
            </button>
          </div>
        </div>
        <div className='w-full'>
          {playlists.map((playlist) => (
            <PlaylistCard key={playlist.id} playlist={playlist} />
          ))}
        </div>
      </div>
    </section>
  );
}

const PlaylistCard = ({ playlist }) => {
  return (
    <div
      className='border-b border-black bg-zinc-800 p-2 flex gap-2 items-center justify-between'
      key={playlist.id}>
      <div className='flex items-center gap-2'>
        {playlist.images && (
          <Image
            src={playlist.images[0].url}
            height={playlist.images[0].height}
            width={playlist.images[0].width}
            alt={playlist.name}
            className='rounded w-8 h-8'
          />
        )}
        <p className='text-zinc-400'>{playlist.name}</p>
      </div>
      <p className='text-zinc-400'>{playlist.owner.display_name}</p>
    </div>
  );
};
