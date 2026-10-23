"use client";

import { useState } from "react";
import Link from "next/link";

/** Official Sarigo logo from /public/logo.png or /public/logo.svg. */
export function Logo({
  className = "",
  showText = true,
  href = "/",
}: {
  className?: string;
  showText?: boolean;
  href?: string;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <Link href={href} className={`flex items-center gap-2 shrink-0 ${className}`}>
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src="/logo.png"
          alt="Sarigo"
          width={32}
          height={32}
          className="h-8 w-8 object-contain"
          onError={(e) => {
            const el = e.currentTarget;
            if (el.src.endsWith("logo.png")) {
              el.src = "/logo.svg";
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <span
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-paprika text-xs font-bold text-white"
          aria-hidden
        >
          S
        </span>
      )}
      {showText && (
        <span className="text-[17px] font-bold tracking-tight text-ink">
          Sarigo
        </span>
      )}
    </Link>
  );
}
