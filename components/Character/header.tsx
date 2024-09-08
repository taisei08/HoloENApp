"use client";

import Image from "next/image";
import { useParams } from "next/navigation";

const Header = () => {
  const params = useParams();
  const character: string = Array.isArray(params.character) ? params.character[0] : params.character;
  
  return (
    <div className="h-60 overflow-hidden flex items-center justify-center">
      <h1 className="text-4xl font-bold text-center">{character.replace("-"," ")}</h1>
      <div className="relative w-[350px] h-[1000px] aspect-square top-60 -z-40">
        <Image
          src={`/character/full/${character}.png`}
          alt={character}
          layout='fill'
          objectFit="cover"
        />
      </div>
      <div className="relative bottom-80 right-80 -z-50">
        <div className="absolute w-[500px] h-[1500px]">
          <Image
            src={`/character/full/${character}.png`}
            alt={character}
            layout='fill'
            objectFit="cover"
            className="blur-[8px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
