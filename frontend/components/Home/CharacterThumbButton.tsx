"use client"

import Image from 'next/image';
import Link from 'next/link';

const CharacterThumbButton = ({ jpName, enName, src }: { jpName: string, enName: string, src: string }) => {
  return (
    <div className="text-center">
      <Link href={`/${src}`} key={src}>
        <div className="border-2 border-accent inline-block rounded-lg group">
          <div className="relative w-48 h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-200 z-0"></div>
            <Image
              src={`/character/thumb/${src}.png`}
              alt={`${enName}`}
              fill
              sizes = "100% 100%"
              priority
              className="relative object-fill rounded"
            />
            <div className="absolute top-0 right-0 bottom-0 left-0 z-20 m-auto border border-accent rounded-lg" style={{ width: 'calc(100% - 6px)', height: 'calc(100% - 6px)'}}></div>
          </div>
        </div>
        <div className="hover:underline">
          <p className="text-lg font-bold mt-2 mb-0.5 mx-auto w-40 break-words">{enName}</p>
          <p className="text-sm mx-auto w-40 break-words">{jpName}</p>
        </div>
      </Link>
    </div>
  );
};

export default CharacterThumbButton;
