"use client";

import { signOut, useSession } from "next-auth/react";
import useSpotify from "./hooks/useSpotify";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  const spotifyApi = useSpotify();
  const { data: session, status } = useSession();
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      spotifyApi.getMyRecentlyPlayedTracks({ limit: 5 }).then((data) => {
        setSongs(data.body.items);
      });
    }
  }, [session, spotifyApi]);

  if (session) {
    return (
      <>
        <main>
          <div className="flex justify-between p-4 bg-zinc-700 text-white text-lg'">
            <p>
              Signed in as{" "}
              <span className='text-[#1DB954]'>{session.user.username}</span>
            </p>
            <button onClick={() => signOut()}>Sign out</button>
          </div>
          <div>
            {songs.map((song) => (
              <div key={song.played_at}>
                <Image
                  src={song.track.album.images[0].url}
                  alt={song.track.album.name}
                  width={100}
                  height={100}
                />
                <p>{song.track.name}</p>
                <p>{song.track.artists[0].name}</p>
              </div>
            ))}
          </div>
        </main>
      </>
    );
  }
  return (
    <>
      <main>
        <a href='/login'> Login</a>
      </main>
    </>
  );
}
