import { Sentiment } from '@zaxido/types-common';
import {
  GetSentimentProps,
  InputIdToSentimentMap,
  SentimentInput,
} from './sentiment-common';

export const subredditWhitelist = [
  'MadeMeSmile',
  'wholesomememes',
  'aww',
  'oddlysatisfying',
  'IllegallySmolCats',
  'FunnyAnimals',
  'blursedimages',
  'PeopleFuckingDying',
];

export const subredditBlacklist = [
  'WhitePeopleTwitter',
  'oddlyterrifying',
  'mildlyinfuriating',
  'Wellthatsucks',
  'CrazyFuckingVideos',
  'therewasanattempt',
  'NotHowGirlsWork',
  'tifu',
  'natureismetal',
  'dankmemes',
  'Superstonk',
  'Funnymemes',
  'facepalm',
  'WorkReform',
  'terriblefacebookmemes',
  'BlackPeopleTwitter',
  'meirl',
  'HolUp',
];

export interface GetSentimentsFromHardcodedRulesProps {
  inputs: SentimentInput[];
}

function getSentiment({ input }: GetSentimentProps): Sentiment {
  if (subredditWhitelist.includes(input.subreddit)) return 'positive';
  if (subredditBlacklist.includes(input.subreddit)) return 'negative';
  return 'neutral';
}

export function getSentimentsFromHardcodedRules({
  inputs,
}: GetSentimentsFromHardcodedRulesProps): InputIdToSentimentMap {
  // eslint-disable-next-line prefer-const
  let listingIdToSentiment: Record<string, Sentiment> = {};

  for (const input of inputs) {
    const sentiment = getSentiment({ input });

    listingIdToSentiment[input.id] = sentiment;
  }

  return listingIdToSentiment;
}
