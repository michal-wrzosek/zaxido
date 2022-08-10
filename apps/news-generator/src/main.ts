import { connect, DBListing } from '@zaxido/backend-common';
import {
  MONGODB_DB,
  MONGODB_DOMAIN,
  MONGODB_PASSWORD,
  MONGODB_USERNAME,
  REDDIT_APP_ID,
  REDDIT_APP_SECRET,
} from './configuration';
import { fetchListings, getAccessToken } from './lib/reddit';
import { getSentiments, SentimentInput } from './lib/sentiment-prompt';
import { memo } from './utils/memo';

async function run() {
  const { collections, closeConnection } = await connect({
    username: MONGODB_USERNAME,
    password: MONGODB_PASSWORD,
    dbName: MONGODB_DB,
    domain: MONGODB_DOMAIN,
  });

  const updateId = +new Date();

  collections.listingsUpdateId.insertOne({
    id: updateId,
    finished: false,
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

    const sentiments = await getSentiments({ inputs: sentimentInputs });

    const listings = listingsResponse.data.children.reduce<DBListing[]>(
      (listingsAcc, listingResponse) => {
        const sentiment = sentiments[listingResponse.data.id];
        if (!sentiment) return listingsAcc;

        return [
          ...listingsAcc,
          {
            id: listingResponse.data.id,
            kind: listingResponse.kind,
            title: listingResponse.data.title,
            subreddit: listingResponse.data.subreddit,
            permalink: listingResponse.data.permalink,
            author: listingResponse.data.author,
            numberOfComments: listingResponse.data.num_comments,
            url: listingResponse.data.url,
            createdUTC: listingResponse.data.created_utc,
            thumbnail: listingResponse.data.thumbnail,
            thumbnailWidth: listingResponse.data.thumbnail_width,
            thumbnailHeight: listingResponse.data.thumbnail_height,
            previews:
              listingResponse.data.preview?.images.map((image) => ({
                source: image.source,
                resolutions: image.resolutions,
              })) ?? [],
            isVideo: listingResponse.data.is_video,
            ups: listingResponse.data.ups,
            downs: listingResponse.data.downs,
            isNSFW: listingResponse.data.over_18,
            sentiment: sentiment,
            updateId,
          },
        ];
      },
      []
    );

    await collections.listings.insertMany(listings);
    await collections.listingsUpdateId.updateOne(
      { id: updateId },
      { $set: { finished: true } }
    );
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
  });
