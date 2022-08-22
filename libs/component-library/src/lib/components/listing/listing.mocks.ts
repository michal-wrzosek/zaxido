import { DBListing } from '@zaxido/types-common';

export const exampleListing: DBListing = {
  redditId: 'example-id',
  title: 'Example title',
  author: 'exampleauthor',
  createdUTC: +new Date('08 August 2022') / 1000,
  downs: 18,
  ups: 8734,
  isNSFW: false,
  isVideo: false,
  kind: 't3',
  numberOfComments: 413,
  permalink:
    '/r/wholesomememes/comments/wi56i5/yeah_id_wear_that_in_a_heartbeat/',
  subreddit: 'wholesomememes',
  thumbnail:
    'https://b.thumbs.redditmedia.com/dzbAHC3pf_Iwh9H2buOWMzER4XcMyn39qCEM2L-PLKE.jpg',
  thumbnailWidth: 140,
  thumbnailHeight: 140,
  url: 'https://i.redd.it/zpfioclzg7g91.jpg',
  previews: [
    {
      source: {
        url: 'https://preview.redd.it/zpfioclzg7g91.jpg?auto=webp&s=c891d8d8fd91c65316676b6eab021daf902adeee',
        width: 750,
        height: 912,
      },
      resolutions: [
        {
          url: 'https://preview.redd.it/zpfioclzg7g91.jpg?width=108&crop=smart&auto=webp&s=1ce1a1f5b0184baee466529f2a8fcdcc8a71a535',
          width: 108,
          height: 131,
        },
        {
          url: 'https://preview.redd.it/zpfioclzg7g91.jpg?width=216&crop=smart&auto=webp&s=99a83409375e8f0045e9e6243beb187d2e443883',
          width: 216,
          height: 262,
        },
        {
          url: 'https://preview.redd.it/zpfioclzg7g91.jpg?width=320&crop=smart&auto=webp&s=f68c2dff475d9a82cb6001c93d8cf48c2d305506',
          width: 320,
          height: 389,
        },
        {
          url: 'https://preview.redd.it/zpfioclzg7g91.jpg?width=640&crop=smart&auto=webp&s=22e2d926bf68e2dccd12506b0f87a403b67a67a7',
          width: 640,
          height: 778,
        },
      ],
    },
  ],
};
