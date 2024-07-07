import Image from 'next/image';
import RoundGauge from './RoundGauge';

const ContentCard = () => {
  return (
    <div className="flex flex-col items-center w-56 h-72 rounded-lg shadow">
      <Image src="/temp/postcss.config.jpg" alt="Image" width={200} height={200} className="mt-3 rounded" />
      <a className="link link-hover link-accent text-xs mr-20 mt-1">元動画へのリンク▶︎</a>
      <div className="mb-2 text-center">
        <h2 className="w-48 text-xl font-bold hover:underline">あああああ</h2>
      </div>
      <div className="flex items-center">
        <p className='text-xs font-bold mr-1'>WPM</p>
        <RoundGauge value={100} />
        <p className='text-xs ml-4 hover:underline'>3m12s</p>
      </div>
      <p className="text-xs ml-32 font-bold hover:underline">2021/09/01</p>
    </div>
  );
};

export default ContentCard;
