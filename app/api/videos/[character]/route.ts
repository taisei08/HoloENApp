import { NextResponse } from "next/server";
import { db } from "@/lib/firebase/firebase";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { character: string } }) {
  const { character } = params;
  
  const { searchParams } = new URL(req.url);
  const sort = searchParams.get('sort') || 'new';

  let orderBy: string = '';
  let sort_field: string = '';

  switch (sort) {
    case 'new':
      orderBy = 'uploaded_at'
      sort_field = 'desc'
      break
    case 'old':
      orderBy = 'uploaded_at'
      sort_field = 'asc'
      break
    case 'highWPM':
      orderBy = 'wpm'
      sort_field = 'desc'
      break
    case 'lowWPM':
      orderBy = 'wpm'
      sort_field = 'asc'
      break
  }

  const offset = 0;
  const videosRef = db.collection(`videos/${character}/information`);
  
  const q = videosRef.orderBy(orderBy, sort_field).offset(offset).limit(50);
  
  const querySnapshot = await q.get();
  
  if (!querySnapshot.empty) {
    const videosData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return NextResponse.json(videosData, { status: 200 });
  } else {
    return NextResponse.json({ error: 'No videos found' }, { status: 404 });
  }
}
