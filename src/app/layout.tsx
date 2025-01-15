import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import { User } from "@clerk/nextjs/server";

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
            <a href="/" className="btn btn-ghost text-xl text-slate-700 dark:text-white">Skibidengine</a>
          </div>
          <div className="flex-none mx-10">
            <SignedIn>
            <button className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current plus-icon">
                <defs>
                    <filter id="dark-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                        <feOffset dx="2" dy="2" result="offsetblur" />
                        <feFlood floodColor="rgba(255,255,255,0.3)" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                    <filter id="light-shadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
                        <feOffset dx="2" dy="2" result="offsetblur" />
                        <feFlood floodColor="rgba(0,0,0,0.3)" />
                        <feComposite in2="offsetblur" operator="in" />
                        <feMerge>
                            <feMergeNode />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 5v14M5 12h14">
                </path>
              </svg>
            </button>
            <UserButton></UserButton>
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