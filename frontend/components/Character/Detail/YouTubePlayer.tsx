import { useEffect, useState, useRef } from 'react';

interface Segment {
  text: string;
  start: number;
  duration: number;
}

const YouTubePlayer: React.FC = () => {
  const player = useRef<any>(null);
  const [segments, setSegments] = useState<Segment[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const timeoutId = useRef<NodeJS.Timeout | null>(null);
  const selectedIndicesRef = useRef(selectedIndices);
  const segmentsRef = useRef<Segment[]>([]);
  const videoId = '9g33-DTYPiA';

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
        events: {
          onReady: onPlayerReady,
        },
      });
      player.current = playerInstance;
    };
  }, []);

  const onPlayerReady = () => {
    loadCSV(`/temp/${videoId}.csv`, (csvData: string) => {
      const lines = csvData.trim().split('\n');
      const loadedSegments = lines.slice(1).map((line) => {
        const data = line.split(',');
        return {
          text: data[0],
          start: parseFloat(data[1]),
          duration: parseFloat(data[2]),
        };
      });
      setSegments(loadedSegments);
      segmentsRef.current = loadedSegments;
    });
  };

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
      const start = firstSegment.start;
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

  const loadCSV = (url: string, callback: (data: string) => void) => {
    fetch(url)
      .then((response) => response.text())
      .then((data) => callback(data))
      .catch((error) => console.error('Error loading CSV:', error));
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      playSelectedSegments();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
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
            data-start={segment.start}
            data-duration={segment.duration}
            onClick={() => handleSegmentClick(index)}
          >
            {segment.text + ' '}
          </span>
        ))}
      </div>
    </div>
  );
};

export default YouTubePlayer;
