"use client"

import { useParams } from "next/navigation";

const Post = () => {
  const params = useParams();

  return <p>Post: {params.name}</p>;
};

export default Post;
