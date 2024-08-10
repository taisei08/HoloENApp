"use client"

import { useState, useEffect } from "react";
import YouTubePlayer from "../../../components/Character/Detail/YouTubePlayer";
import { useParams } from "next/navigation";
import axios from 'axios';
import { VideoInformation, Transcription } from "../../../interfaces/video";

const Detail = () => {
  const params = useParams();
  const { character, videoId } = params as { character: string, videoId: string };
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [video, setVideo] = useState<VideoInformation>();


  const fetchTranscriptions = async () => {
    try {
      const response = await axios.get(`/api/videos/${character}/${videoId}/transcriptions`);
      console.log(response.data);
      setTranscriptions(() => response.data);
    } catch (error) {
      console.error("Failed to fetch transcriptions:", error);
    }
  };

  const fetchVideoInformation = async () => {
    try {
      const response = await axios.get<VideoInformation[]>(`/api/videos/${character}/${videoId}`);
      setVideo(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch video information:", error);
    }
  };

  useEffect(() => {
    fetchVideoInformation();
    fetchTranscriptions();
  }, [videoId]);

  return (
    <div className="container mx-auto p-4">
      <YouTubePlayer transcriptions={transcriptions} videoId={videoId}/>
    </div>
  );
};

export default Detail;
