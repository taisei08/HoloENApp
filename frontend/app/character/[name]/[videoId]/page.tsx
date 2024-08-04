"use client"

import YouTubePlayer from "../../../../components/Character/Detail/YouTubePlayer";
import { useParams } from "next/navigation";
import axios from 'axios';

const Detail = () => {
  const params = useParams();
  const { videoId } = params;

  const insertUser = async () => {
    const response = await axios.get(`/api/videos/${videoId}/transcriptions`);
    console.log(response.data);
  };

  return (
    <div className="container mx-auto p-4">
                  <button
        className="mt-4 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
        onClick={() => insertUser()}>
        Insert User
      </button>

      <YouTubePlayer />
    </div>
  );
};

export default Detail;
