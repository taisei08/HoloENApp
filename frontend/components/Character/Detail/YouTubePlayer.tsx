import { useEffect, useState, useRef } from 'react';

interface Segment {
  transcription: string;
  starting_seconds: number;
  duration: number;
}

interface YouTubePlayerProps {
  segments: Segment[];
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ segments }) => {
  const player = useRef<any>(null);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const selectedIndicesRef = useRef(selectedIndices);
  const segmentsRef = useRef<Segment[]>(segments);
  const videoId = 'QEBDiAS3kZ8';

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
      });
      player.current = playerInstance;
    };
  }, []);

  useEffect(() => {
    // Update segmentsRef when segments prop changes
    segmentsRef.current = segments;
  }, [segments]);

  const handleSegmentClick = (index: number) => {
    if (selectedIndices.length === 0) {
      setSelectedIndices([index]);
      selectedIndicesRef.current = [index];
    } else {
      const minSelectedIndex = Math.min(...selectedIndices);
      const maxSelectedIndex = Math.max(...selectedIndices);
      if (index === minSelectedIndex - 1 || index === maxSelectedIndex + 1) {
        setSelectedIndices([...selectedIndices, index].sort((a, b) => a - b));
        selectedIndicesRef.current = [...selectedIndices, index].sort((a, b) => a - b);
      } else {
        setSelectedIndices([index]);
        selectedIndicesRef.current = [index];
      }
    }
  };

  const playSelectedSegments = () => {
    const selectedSegments = selectedIndicesRef.current.map(index => segmentsRef.current[index]);
    let totalDuration = selectedSegments.reduce((acc, segment) => acc + segment.duration, 0);
    if (selectedSegments.length > 0) {
      const firstSegment = selectedSegments[0];
      const start = firstSegment.starting_seconds;
      console.log(start)
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
    <div>
      <div id="player" className="mb-4"></div>
      <div id="text-container" className="mt-4">
        {segments.map((segment, index) => (
          <span
            key={index}
            className={`${selectedIndices.includes(index) ? 'text-segment-selected bg-yellow-300 inline cursor-pointer' : 'text-segment inline cursor-pointer'}`}
            data-index={index}
            data-start={segment.starting_seconds}
            data-duration={segment.duration}
            onClick={() => handleSegmentClick(index)}
          >
            {segment.transcription + ' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default YouTubePlayer;
