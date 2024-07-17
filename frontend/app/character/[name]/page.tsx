"use client";

import { useParams } from "next/navigation";
import ContentCard from "../../../components/Character/contentCard";
import Header from "../../../components/Character/header";
import Sidebar from "../../../components/Character/sidebar";

const Post = () => {
  const params = useParams();

  return (
      <div className="max-w-custom mx-auto flex-1">
        <Header />
        <div className="flex">
          <div className="hidden lg:block">
            <Sidebar />
          </div>
          <div className="flex flex-wrap justify-center space-x-2">
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
