import "../src/output.css";
import Image from "next/image";
import CharacterThumbButton from "../components/Home/CharacterThumbButton";
import PageTopButton from "../components/Home/PageTopButton";
import VideoScroll from "../components/Home/VideoScroll";
import { characters } from "../data/character";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <div className="pointer-events-none bg-gradient-to-t from- to-/100 w-full flex items-center justify-center">
        <VideoScroll />
        <Image
          src={"/logo/logo_dark.png"}
          alt={"logo"}
          width={180}
          height={180}
          className="absolute w-auto mx-auto items-center justify-center"
        />
      </div>
      <div className="max-w-custom mx-auto p-4">
        <div className="flex flex-wrap justify-center gap-4">
          {characters.map((character) => (
            <CharacterThumbButton
              key={character.src}
              jpName={character.jpName}
              enName={character.enName}
              src={character.src}
            />
          ))}
        </div>
      </div>
      <PageTopButton />
    </div>
  );
}
