import './globals.css';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import Provider from '@lib/provider';
import Navbar from '@components/Navbar';

export const metadata = {
  title: 'WrappedUp',
  description: 'A Spotify Wrapped inspired app',
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body>
        <Provider session={session}>
          <div className='bg-zinc-900 min-h-screen flex flex-col'>
            <Navbar />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
