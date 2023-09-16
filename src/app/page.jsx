"use client";

import { signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        <main>
          Signed in as {session.user.username} <br />
          <button onClick={() => signOut()}>Sign out</button>
        </main>
      </>
    );
  }
  return (
    <>
      <a href='/login'> Login</a>
    </>
  );
}
