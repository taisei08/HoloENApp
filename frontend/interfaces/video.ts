export interface VideoInformation {
  id: string;
  title: string;
  csv_file: string;
  total_seconds: number;
  uploaded_at: string;
  word_count: number;
  wpm: number;
}

export interface Transcription {
  total_seconds: number;
  duration: number;
  text: string;
}
