"use client";

import React from "react";
import { useParams } from "next/navigation";
import ContentCard from "../../../components/Character/contentCard";
import Header from "../../../components/Character/header";
import Sidebar from "../../../components/Character/sidebar";
import SortingMenu from "../../../components/Character/sortingMenu"; // インポートパスを適宜調整してください

const Post: React.FC = () => {
  const params = useParams();

  // 並び替え関数のプレースホルダー
  const handleSort = (criteria: string) => {
    // criteriaに基づいて並び替えロジックを追加
    console.log(`並び替え: ${criteria}`);
  };

  return (
    <div className="max-w-custom mx-auto flex-1">
      <Header />
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
