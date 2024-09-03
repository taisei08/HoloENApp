import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";

export async function GET(res: NextResponse, { params }: { params: { character: string, videoId: string } }) {
  const { character, videoId } = params;

    const transcriptionsRef = db.collection(`videos/${character}/information/${videoId}/transcriptions`);
    const q = transcriptionsRef.orderBy('starting_seconds', 'asc');
    
    const transcriptionsSnap = await q.get();
    
    const transcriptions = [];
    transcriptionsSnap.forEach((doc) => {
      transcriptions.push(doc.data());
    });

    if (transcriptions.length !== 0) {
      return NextResponse.json(transcriptions, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Video not found' }, { status: 404 });
    }
  }
