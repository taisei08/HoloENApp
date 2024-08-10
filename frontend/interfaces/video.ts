export interface VideoInformation {
  id: string;
  title: string;
  total_seconds: number;
  uploaded_at: string;
  word_count: number;
  wpm: number;
}

export interface Transcription {
  starting_seconds: number;
  duration: number;
  transcription: string;
}
