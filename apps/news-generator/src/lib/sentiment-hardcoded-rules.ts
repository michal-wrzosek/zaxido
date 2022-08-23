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
  'Zoomies',
  'catsareliquid',
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
  'tooktoomuch',
  'JustUnsubbed',
  'instant_regret',
  'antiwork',
  'politics',
  'assholedesign',
  'PublicFreakout',
  'KidsAreFuckingStupid',
  'ThatsInsane',
  'unpopularopinion',
  'RoastMe',
  'awfuleverything',
  'SelfAwarewolves',
  'nottheonion',
  'ich_iel',
  'shittymoviedetails',
  'robbersgettingfucked',
  'rareinsults',
  'ToiletPaperUSA',
  'entitledparents',
  'Coronavirus',
  'TIHI',
  'insaneparents',
  'TheRightCantMeme',
  'trashy',
  'TrashTaste',
  'WitchesVsPatriarchy',
  'HermanCainAward',
  'CombatFootage',
  'MarchAgainstNazis',
  'teenagers',
  'sadcringe',
  'LeopardsAteMyFace',
  'TwoSentenceHorror',
  'Weird',
  'fuckcars',
  'ABoringDystopia',
  'polandball',
  'confidentlyincorrect',
  'AskOuija',
  'quityourbullshit',
  'clevercomebacks',
  'lgbt',
  'ThatLookedExpensive',
  'FuckYouKaren',
  'iamverysmart',
  'pettyrevenge',
  'popping',
  'UkraineWarVideoReport',
  'Firearms',
  'thatHappened',
  'antiMLM',
  'bonehurtingjuice',
  'povertyfinance',
  'AnimalsBeingJerks',
  'religiousfruitcake',
  'FunnyandSad',
  'dankchristianmemes',
  'UnethicalLifeProTips',
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
