import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";

export async function GET(res: NextResponse, { params }: { params: { character: string } }) {
  const { character } = params;
  const offset = 50
  const videosRef = db.collection(`videos/${character}/information`);
  const q = videosRef.orderBy("uploaded_at", "desc").offset(offset).limit(50);
  const querySnapshot = await q.get();

  if (!querySnapshot.empty) {
    const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(videosData, { status: 200 });
  } else {
    return NextResponse.json({ error: 'No videos found' }, { status: 404 });
  }
}
