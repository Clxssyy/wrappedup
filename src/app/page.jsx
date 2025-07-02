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
  const [time_range, setTimeRange] = useState('short_term');

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      setTopArtists([]);
      setTopSongs([]);

      spotifyApi
        .getMyTopTracks({ time_range: time_range, limit: 5 })
        .then((data) => {
          setTopSongs(data.body.items);
        });

      spotifyApi
        .getMyTopArtists({ time_range: time_range, limit: 5 })
        .then((data) => {
          setTopArtists(data.body.items);
        });
    }
  }, [session, spotifyApi, time_range]);

  return (
    <>
      <section className='bg-zinc-900 grow'>
        <div className='flex justify-center p-2 gap-2 items-center'>
          <p className='font-bold text-white'>Range: </p>
          <select
            name='time_range_options'
            id='time_range'
            className='bg-zinc-800 rounded-lg px-2 py-1 text-white hover:border-green-400 active:border-green-400 border-2 border-transparent'
            onChange={(e) => {
              setTimeRange(e.target.value);
            }}
            defaultValue={time_range}>
            <option value='short_term'>Last Month</option>
            <option value='medium_term'>Last 6 Months</option>
            <option value='long_term'>All Time</option>
          </select>
        </div>
        <div className='p-2'>
          <h1 className='text-3xl font-bold text-center spotify-green'>
            Top 5 Tracks
          </h1>
        </div>
        <div className='flex gap-2 p-2 w-full flex-wrap justify-center text-white'>
          {topSongs.length > 0
            ? topSongs.map((song) => (
                <div
                  className='min-w-0 border border-black rounded-lg bg-zinc-800 p-2 w-40 flex flex-col gap-2 place-items-center text-center'
                  key={song.name}>
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
              ))
            : 'Login to see top songs!'}
        </div>
        <div className='p-2'>
          <h1 className='text-3xl font-bold text-center spotify-green'>
            Top 5 Artists
          </h1>
        </div>
        <div className='flex gap-2 p-2 flex-wrap justify-center text-white'>
          {topSongs.length > 0
            ? topArtists.map((artist) => (
                <div
                  className='border border-black rounded-lg bg-zinc-800 p-2 w-40 flex flex-col gap-2 place-items-center text-center'
                  key={artist.id}>
                  <Image
                    src={artist.images[0].url}
                    alt={artist.name}
                    width={200}
                    height={200}
                    className='aspect-square'
                  />
                  <p className='text-white text-lg'>{artist.name}</p>
                </div>
              ))
            : 'Login to see top artists!'}
        </div>
      </section>
    </>
  );
}
