"use client";

import React from "react";
import { useParams } from "next/navigation";
import axios from 'axios';
import ContentCard from "../../components/Character/contentCard";
import Header from "../../components/Character/header";
import Sidebar from "../../components/Character/sidebar";
import SortingMenu from "../../components/Character/sortingMenu";


const Post: React.FC = () => {
  const params = useParams();
  const { character } = params;

  const fetchVideoInformation = async () => {
    const response = await axios.get(`/api/videos/${character}`);
    console.log(response.data);
  };

  const handleSort = (criteria: string) => {
    console.log(`並び替え: ${criteria}`);
  };

  return (
    <div className="max-w-custom mx-auto flex-1">
      <Header />
      <button
        className="mt-4 w-60 rounded-full bg-green-500 py-2 px-4 font-bold text-white hover:bg-green-700"
        onClick={() => fetchVideoInformation()}>
        Insert User
      </button>
      <div className="flex">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <div className="flex flex-wrap justify-center space-x-2">
          <div className="w-full flex justify-end mt-4 mb-2 mr-20">
            <SortingMenu handleSort={handleSort} />
          </div>
          <div className="divider"></div>
          {[...Array(10)].map((_, i) => (
            <div key={i} className="m-px">
              <ContentCard />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
