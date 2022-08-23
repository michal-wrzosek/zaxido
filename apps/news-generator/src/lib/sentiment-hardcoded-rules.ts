import { Sentiment } from '@zaxido/types-common';
import {
  GetSentimentProps,
  InputIdToSentimentMap,
  SentimentInput,
} from './sentiment-common';

export const subredditWhitelist = new Set([
  'MadeMeSmile',
  'wholesomememes',
  'aww',
  'oddlysatisfying',
  'IllegallySmolCats',
  'FunnyAnimals',
  'blursedimages',
  'PeopleFuckingDying',
  'cute',
  'Eyebleach',
  'AnimalsBeingDerps',
  'HumansBeingBros',
  'CozyPlaces',
  'rarepuppers',
  'AnimalsBeingBros',
]);

export const subredditBlacklist = new Set([
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
  'me_irl',
  'MaliciousCompliance',
  'ShitMomGroupsSay',
  'PoliticalHumor',
  'shitposting',
  'ImTheMainCharacter',
  'Justrolledintotheshop',
  'WinStupidPrizes',
  'StupidFood',
  'yesyesyesyesno',
  'Instagramreality',
  'atheism',
  'anime_irl',
  'bi_irl',
  'FunnyandSad',
  'AbruptChaos',
  'socialism',
  'MurderedByWords',
  'ukraine',
  'WatchPeopleDieInside',
  'Tinder',
  'ChoosingBeggars',
  'cursedcomments',
  'iamatotalpieceofshit',
  'LivestreamFail',
  'TerrifyingAsFuck',
  'TikTokCringe',
  'Whatcouldgowrong',
  'niceguys',
  'justneckbeardthings',
  'ShittyLifeProTips',
  'DiWHY',
  'BeforeNAfterAdoption',
  'h3h3productions',
  'me_irlgbt',
  'CrappyDesign',
  '2meirl4meirl',
  'Idiotswithguns',
]);

export interface GetSentimentsFromHardcodedRulesProps {
  inputs: SentimentInput[];
}

function getSentiment({ input }: GetSentimentProps): Sentiment {
  if (input.over_18) return 'negative';
  if (subredditWhitelist.has(input.subreddit)) return 'positive';
  if (subredditBlacklist.has(input.subreddit)) return 'negative';
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
