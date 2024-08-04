import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { DocumentData, collection, getDocs, query, orderBy } from 'firebase/firestore';

export async function GET(res: NextResponse, { params }: { params: { character: string, videoId: string } }) {
  const { character, videoId } = params;

  const transcriptionsRef = collection(db, `videos/${character}/information/${videoId}/transcriptions`);
  const q = query(transcriptionsRef, orderBy('starting_seconds', 'asc'));
  const transcriptionsSnap = await getDocs(q);

  const transcriptions: DocumentData[] = [];
  transcriptionsSnap.forEach((doc) => {
    transcriptions.push(doc.data());
  });


  if (transcriptions.length !== 0) {
    return NextResponse.json(JSON.stringify(transcriptions), { status: 200 });
  } else {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 })
  }
}
