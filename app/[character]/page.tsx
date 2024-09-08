"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from 'axios';
import ContentCard from "../../components/Character/contentCard";
import Header from "../../components/Character/header";
import Sidebar from "../../components/Character/sidebar";
import SortingMenu from "../../components/Character/sortingMenu";
import { VideoInformation } from "../../interfaces/video";


const Post: React.FC = () => {
  const params = useParams();
  const { character } = params;
  const [videos, setVideos] = useState<VideoInformation[]>([]);

  const fetchVideoInformation = async () => {
    try {
      const response = await axios.get<VideoInformation[]>(`/api/videos/${character}`);
      setVideos(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch video information:", error);
    }
  };

  useEffect(() => {
    fetchVideoInformation();
  }, []);


  const handleSort = (criteria: string) => {
    console.log(`並び替え: ${criteria}`);
  };

  return (
    <div className="max-w-custom mx-auto flex-1">
      <Header />
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex flex-col">
          <div className="mt-8 flex justify-end">
            <SortingMenu handleSort={handleSort} />
          </div>
          <div className="divider"></div>
          <div className="flex flex-wrap justify-center space-x-2">
            {videos.map((video) => (
              <div key={video.id} className="m-px">
                <ContentCard video={video}/>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
