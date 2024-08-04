import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { collection, query, orderBy, getDocs } from 'firebase/firestore';

export async function GET(res: NextResponse, { params }: { params: { character: string } }) {
  const { character } = params;

  const videosRef = collection(db, `videos/${character}/information`);
  const q = query(videosRef, orderBy("uploaded_at", "desc"));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(videosData, { status: 200 });
  } else {
    return NextResponse.json({ error: 'No videos found' }, { status: 404 });
  }
}

