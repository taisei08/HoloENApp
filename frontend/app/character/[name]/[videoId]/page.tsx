"use client"

import YouTubePlayer from "../../../../components/Character/Detail/YouTubePlayer";
import { useParams } from "next/navigation";

const Detail = () => {
  const params = useParams();

  return (
    <div className="container mx-auto p-4">
      <YouTubePlayer />
    </div>
  );
};

export default Detail;
