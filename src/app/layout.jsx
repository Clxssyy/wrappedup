import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Provider from "./lib/provider";

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang='en'>
      <body>
        <Provider session={session}>{children}</Provider>
      </body>
    </html>
  );
}
