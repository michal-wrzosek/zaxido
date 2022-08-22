import { Sentiment } from '@zaxido/types-common';

export interface SentimentInput {
  id: string;
  title: string;
  subreddit: string;
  over_18?: boolean;
}

export interface GetSentimentProps {
  input: SentimentInput;
}

export type InputIdToSentimentMap = Record<string, Sentiment>;
