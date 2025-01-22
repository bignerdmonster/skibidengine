import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Link from 'next/link';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import PostButton from "./_components/skibutton";


export const metadata: Metadata = {
  title: "skibidengine | a fourm engine",
  description: "Fent Reactor; a reactor to power the world",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href="/" className="btn btn-ghost text-xl text-slate-700 dark:text-white">Skibidengine</Link>
          </div>
          <div className="flex-none mx-10">
            <SignedIn>
            <PostButton className={"btn btn-square btn-ghost"}/>
            <UserButton/>
            </SignedIn>
            <SignedOut>
              <SignInButton>Sign In</SignInButton>
            </SignedOut>
          </div>
        </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}