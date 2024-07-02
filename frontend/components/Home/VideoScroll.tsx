"use client"

import React, { useEffect, useRef, useState } from 'react';

const initialVideos = [
  '/videos/1.mp4',
  '/videos/2.mp4',
  '/videos/3.mp4',
  '/videos/4.mp4',
  '/videos/5.mp4',
  '/videos/6.mp4',
  '/videos/7.mp4'
];

const VideoScroll = () => {
  const scrollContainerRef = useRef(null);
  const [videos, setVideos] = useState([...initialVideos, ...initialVideos]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    let scrollAmount = 0;
    const scrollStep = 2;
    const delay = 30;

    const scroll = () => {
      scrollAmount += scrollStep;
      console.log(scrollAmount, scrollContainer.scrollWidth / 2)
      if (scrollAmount >= scrollContainer.scrollWidth / 2) {
        setVideos(prevVideos => [...prevVideos, ...initialVideos]);
      }
      scrollContainer.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    };

    const intervalId = setInterval(scroll, delay);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={"w-custom overflow-x-scroll whitespace-nowrap hidden-scrollbar relative"}
      ref={scrollContainerRef}
    >
      {videos.map((video, index) => (
        <div key={index} className="inline-block w-56 h-96">
          <video
            src={video}
            className="absolute h-96 filter grayscale"
            muted
            loop
            autoPlay
            playsInline
          />
        </div>
      ))}
    </div>
  );
};

export default VideoScroll;
