import { NextResponse } from "next/server";
import { db, bucket } from "@/lib/firebase/firebase";
import Papa from "papaparse";

const fetchCSVFromStorage = async (videoId: string) => {
  try {
    // Storageからファイルを読み込み
    const file = bucket.file(`videos/transcriptions/${videoId}.csv`);
    const [data] = await file.download();

    return new Promise((resolve, reject) => {
      Papa.parse(data.toString('utf-8'), {
        header: true, // ヘッダーがある場合
        complete: (results) => {
          resolve(results.data); // データを解決
        },
        error: (error) => {
          reject(error); // エラーを拒否
        },
      });
    });
  } catch (error) {
    console.error("Error fetching CSV from Firebase Storage:", error);
  }
};

export async function GET(res: NextResponse, { params }: { params: { videoId: string } }) {
  const { videoId } = params;

  const transcriptions = await fetchCSVFromStorage(videoId);
  console.log("Transcriptions:", transcriptions);
  if (transcriptions.length !== 0) {
    return NextResponse.json(transcriptions, { status: 200 });
  } else {
    return NextResponse.json({ error: 'Video not found' }, { status: 404 });
  }
}
