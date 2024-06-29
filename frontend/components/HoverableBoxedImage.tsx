"use client";

import Image from 'next/image';

const ProfileCard = ({ src, jpName, enName }: { src: string, jpName: string, enName: string }) => {
  return (
    <div className="text-center group">
      <div className="border-2 border-accent inline-block">
        <div className="relative w-48 h-48">
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-200 z-0"></div>
          <Image
            src={src}
            alt="Profile"
            layout="fill"
            objectFit="cover"
            className="relative z-10"
          />
          <div className="absolute top-0 right-0 bottom-0 left-0 z-20 m-auto border border-accent" style={{ width: 'calc(100% - 6px)', height: 'calc(100% - 6px)'}}></div>
        </div>
      </div>
      <p className="text-lg mt-2 mb-1 mx-auto w-fit">{jpName}</p>
      <p className="text-sm mx-auto w-fit">{enName}</p>
    </div>
  );
};

export default ProfileCard;
