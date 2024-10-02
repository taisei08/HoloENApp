import { useEffect, useState, useRef } from 'react';
import { Transcription } from '../../../interfaces/video';

interface YouTubePlayerProps {
  transcriptions: Transcription[];
  videoId: string;
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ transcriptions, videoId }) => {
  const player = useRef<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const selectedIndexRef = useRef(selectedIndex);
  const segmentsRef = useRef<Transcription[]>(transcriptions);

  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode!.insertBefore(tag, firstScriptTag);

    (window as any).onYouTubeIframeAPIReady = () => {
      const playerInstance = new (window as any).YT.Player('player', {
        height: '390',
        width: '640',
        videoId: videoId,
        playerVars: {
          modestbranding: 1,
          rel: 0,
        },
      });
      player.current = playerInstance;
    };
  }, [videoId]);

  useEffect(() => {
    segmentsRef.current = transcriptions;
  }, [transcriptions]);

  const highlightSentence = (index: number) => {
    if (selectedIndex.length === 0) {
      setSelectedIndex([index]);
      selectedIndexRef.current = [index];
    } else {
      const maxSelectedIndex = Math.max(...selectedIndex);
      if (maxSelectedIndex < index) {
        // INFO: 現在のselectedIndex+1からindexまでの整数を追加してソート
        const range:number[] = Array.from({ length: index - maxSelectedIndex }, (_, i) => maxSelectedIndex + 1 + i);
        setSelectedIndex([...selectedIndex, ...range].sort((a, b) => a - b));
        selectedIndexRef.current = [...selectedIndex, index].sort((a, b) => a - b);
      } else {
        setSelectedIndex([index]);
        selectedIndexRef.current = [index];
      }
    }
  };

  const playSelectedSegments = () => {
    const selectedSegments = selectedIndexRef.current.map(index => segmentsRef.current[index]);
    let totalDuration = selectedSegments.reduce((acc, segment) => acc + Number(segment.duration), 0);
    if (selectedSegments.length > 0) {
      const firstSegment = selectedSegments[0];
      const start = firstSegment.total_seconds;
      player.current.seekTo(start);
      player.current.playVideo();
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      timeoutId.current = setTimeout(() => {
        player.current.pauseVideo();
      }, (totalDuration + 1) * 1000);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      playSelectedSegments();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-4 bg-white shadow-lg rounded-lg flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0">
      <div id="text-container" className="w-full lg:w-1/2 max-h-128 overflow-y-auto p-4 border border-gray-300 rounded-md bg-gray-100" style={{ maxHeight: '600px' }}>
        {transcriptions.map((transcription, index) => (
          <span
            key={index}
            className={`${
              selectedIndex.includes(index)
                ? 'text-segment-selected bg-yellow-300 inline cursor-pointer px-1 py-0.5 rounded'
                : 'text-segment inline cursor-pointer px-1 py-0.5 rounded hover:bg-yellow-200'
            }`}
            data-index={index}
            data-start={transcription.total_seconds}
            data-duration={transcription.duration}
            onClick={() => highlightSentence(index)}
          >
            {transcription.text + ' '}
          </span>
        ))}
      </div>
      <div id="player-container" className="w-full lg:w-1/2 flex justify-center">
        <div id="player" className="w-full h-64 lg:h-72"></div>
      </div>
    </div>
  );
};

export default YouTubePlayer;
