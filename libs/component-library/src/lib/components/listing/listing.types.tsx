import * as GraphqlTypes from '../../graphql/graphql.generated';

export interface ListingProps {
  listing: Pick<
    GraphqlTypes.Listing,
    | 'id'
    | 'title'
    | 'thumbnail'
    | 'subreddit'
    | 'author'
    | 'url'
    | 'numberOfComments'
    | 'permalink'
    | 'ups'
    | 'downs'
  >;
}
