'use client';

import { useEffect, useState } from 'react';
import useSpotify from '@hooks/useSpotify';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

export default function Home() {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [topSongs, setTopSongs] = useState([]);
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi
        .getMyTopTracks({ time_range: 'short_term', limit: 5 })
        .then((data) => {
          setTopSongs(data.body.items);
        });

      spotifyApi
        .getMyTopArtists({ time_range: 'short_term', limit: 5 })
        .then((data) => {
          setTopArtists(data.body.items);
        });
    }
  }, [session, spotifyApi]);

  return (
    <>
      <section className='bg-zinc-900 grow'>
        <div className='p-2'>
          <h1 className='text-3xl font-bold text-center spotify-green'>
            Top 5 Tracks
          </h1>
        </div>
        <div className='flex gap-2 p-2 w-full flex-wrap justify-center'>
          {topSongs.map((song) => (
            <div
              className='min-w-0 border border-black rounded-lg bg-zinc-800 p-2 w-40 flex flex-col gap-2 place-items-center text-center'
              key={song.name}
            >
              <Image
                src={song.album.images[0].url}
                alt={song.album.name}
                width={200}
                height={200}
              />
              <div className='w-full truncate'>
                <p className='text-lg italic text-white'>{song.name}</p>
                <p className='text-gray-300 text-xs'>
                  {song.album.artists[0].name}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className='p-2'>
          <h1 className='text-3xl font-bold text-center spotify-green'>
            Top 5 Artists
          </h1>
        </div>
        <div className='flex gap-2 p-2 flex-wrap justify-center'>
          {topArtists.map((artist) => (
            <div
              className='border border-black rounded-lg bg-zinc-800 p-2 w-40 flex flex-col gap-2 place-items-center text-center'
              key={artist.id}
            >
              <Image
                src={artist.images[0].url}
                alt={artist.name}
                width={200}
                height={200}
                className='aspect-square'
              />
              <p className='text-white text-lg'>{artist.name}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
