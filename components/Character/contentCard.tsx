import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import RoundGauge from './RoundGauge';
import { VideoInformation } from '../../interfaces/video';

const ContentCard = ({ video }: { video: VideoInformation }) => {
  const pathname = usePathname();
  const minutes = Math.floor(video.total_seconds / 60);
  const seconds = video.total_seconds % 60;
  const formatted_time = `${minutes}m${seconds}s`;

  return (
    <div className="flex flex-col items-center w-56 h-72 rounded-lg shadow">
      <Image src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`} alt="Thumbnail" width={200} height={200} className="mt-3 rounded" />
      <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" className="link link-hover link-accent text-xs mr-20 mt-1">元動画へのリンク▶︎</a>
      <div className="mb-2 text-center">
        <Link href={`${pathname}/${video.id}`}>
          <h2 className="w-48 text-xl font-bold line-clamp-3 hover:underline overflow-hidden">
            {video.title}
          </h2>
        </Link>
      </div>
      <div className="flex items-center">
        <p className='text-xs font-bold mr-1'>WPM</p>
        <RoundGauge value={video.wpm} />
        <p className='text-xs ml-4 hover:underline'>{formatted_time}</p>
      </div>
      <p className="text-xs ml-32 font-bold hover:underline">{video.uploaded_at.split("T")[0]}</p>
    </div>
  );
};

export default ContentCard;
