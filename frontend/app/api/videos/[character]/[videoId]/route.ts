import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { doc, getDoc } from 'firebase/firestore';

export async function GET(res: NextResponse, { params }: { params: { character: string, videoId: string } }) {
  const { character, videoId } = params;

  const videoRef = doc(db, `videos/${character}/information/${videoId}`);
  const videoSnap = await getDoc(videoRef)

  if (videoSnap.exists()) {
    const videoData = videoSnap.data();
    return NextResponse.json(videoData, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }
}
