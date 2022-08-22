import { isUri } from 'valid-url';
import { connect } from '@zaxido/backend-common';
import { DBListing } from '@zaxido/types-common';
import {
  MONGODB_DB,
  MONGODB_DOMAIN,
  MONGODB_PASSWORD,
  MONGODB_USERNAME,
  REDDIT_APP_ID,
  REDDIT_APP_SECRET,
} from './configuration';
import { fetchListings, getAccessToken } from './lib/reddit';
import { getSentimentsFromGPT3 } from './lib/sentiment-gpt3';
import { memo } from './utils/memo';
import { getSentimentsFromHardcodedRules } from './lib/sentiment-hardcoded-rules';
import { SentimentInput } from './lib/sentiment-common';

async function run() {
  const { collections, closeConnection } = await connect({
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
    dbName: MONGODB_DB,
    domain: MONGODB_DOMAIN,
  });

  try {
    const accessToken = await memo('access-token', async () =>
      getAccessToken(REDDIT_APP_ID, REDDIT_APP_SECRET)
    );
    const listingsResponse = await memo(
      'listings-popular-hot-global-100',
      async () =>
        fetchListings({
          accessToken,
          subreddit: 'popular',
          kind: 'hot',
          hotLocation: 'GLOBAL',
          limit: 100,
        })
    );

    const sentimentInputs: SentimentInput[] =
      listingsResponse.data.children.map(
        ({ data: { id, title, subreddit } }) => ({ id, title, subreddit })
      );

    const sentimentsFromHardcodedRules = getSentimentsFromHardcodedRules({
      inputs: sentimentInputs,
    });

    /**
     * If hardcoded rules could not decide if it's positive or negative,
     * we will check those "neutrals" with GPT3
     */
    const sentimentsToCheckWithGPT3 = sentimentInputs.filter(
      ({ id }) =>
        sentimentsFromHardcodedRules[id] !== 'negative' &&
        sentimentsFromHardcodedRules[id] !== 'positive'
    );

    const sentimentsFromGPT3 = await getSentimentsFromGPT3({
      inputs: sentimentsToCheckWithGPT3,
      sentimentsCollection: collections.sentiments,
    });

    const sentiments = {
      ...sentimentsFromHardcodedRules,

      // Overwrite hardcoded sentiments with GPT3 results
      ...sentimentsFromGPT3,
    };

    const listings = listingsResponse.data.children.reduce<DBListing[]>(
      (listingsAcc, listingResponse) => {
        const sentiment = sentiments[listingResponse.data.id];
        if (!sentiment) return listingsAcc;

        // We want only positive listings
        if (sentiment !== 'positive') return listingsAcc;

        return [
          ...listingsAcc,
          {
            redditId: listingResponse.data.id,
            kind: listingResponse.kind,
            title: listingResponse.data.title,
            subreddit: listingResponse.data.subreddit,
            permalink: listingResponse.data.permalink,
            author: listingResponse.data.author,
            numberOfComments: listingResponse.data.num_comments,
            url: listingResponse.data.url,
            createdUTC: listingResponse.data.created_utc,
            thumbnail: isUri(listingResponse.data.thumbnail)
              ? listingResponse.data.thumbnail
              : null,
            thumbnailWidth: listingResponse.data.thumbnail_width ?? null,
            thumbnailHeight: listingResponse.data.thumbnail_height ?? null,
            previews:
              listingResponse.data.preview?.images.map((image) => ({
                source: image.source,
                resolutions: image.resolutions,
              })) ?? [],
            isVideo: listingResponse.data.is_video,
            ups: listingResponse.data.ups,
            downs: listingResponse.data.downs,
            isNSFW: listingResponse.data.over_18,
          },
        ];
      },
      []
    );

    await collections.listings.drop();
    await collections.listings.insertMany(listings);
  } catch (error) {
    console.error(error);
  } finally {
    await closeConnection();
  }
}

console.log('START');

run()
  .then(() => {
    console.log('SUCCESS');
  })
  .catch((error) => {
    console.log('ERROR');
    console.error(error);
  })
  .finally(() => {
    console.log('FINISH');
    process.exit();
  });
