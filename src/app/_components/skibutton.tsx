"use client";

import { useRouter } from "next/navigation";

export default function PostButton({className = ""}) {
  const router = useRouter();
  return (
      <a href="/newpost"><button className={className} >
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
      </button></a>
  );
}
