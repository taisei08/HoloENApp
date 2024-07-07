"use client"

import { useParams } from "next/navigation";
import ContentCard from "../../../components/Character/contentCard";

const Post = () => {
  const params = useParams();

  return (
    <div className="max-w-custom mx-auto">
      <div className="flex flex-wrap justify-center space-x-2">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="m-px">
            <ContentCard />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
