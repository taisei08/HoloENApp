import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase"; // firebase-admin 初期化ファイルを使用

export async function GET(res: NextResponse, { params }: { params: { character: string, videoId: string } }) {
  const { character, videoId } = params;

  const videoRef = db.doc(`videos/${character}/information/${videoId}`);
  const videoSnap = await videoRef.get();

  if (videoSnap.exists) {
    const videoData = videoSnap.data();
    return NextResponse.json(videoData, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 });
  }
}
