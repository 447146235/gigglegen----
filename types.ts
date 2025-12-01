export enum ContentType {
  JOKE = 'JOKE',
  MEME = 'MEME',
  VIDEO = 'VIDEO'
}

export interface JokeData {
  setup: string;
  punchline: string;
  tags: string[];
}

export interface MemeData {
  imageUrl: string;
  caption: string;
}

export interface VideoData {
  videoUrl: string;
  prompt: string;
}

export interface FunContent<T> {
  id: string;
  type: ContentType;
  timestamp: number;
  data: T;
}

export type GenerationStatus = 'idle' | 'generating' | 'error' | 'success';

export interface PageProps<T> {
  history: FunContent<T>[];
  addToHistory: (item: FunContent<T>) => void;
}