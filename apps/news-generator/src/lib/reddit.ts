import axios from 'axios';
import { URLSearchParams } from 'url';
import {
  HotLocation,
  RedditApiAccessTokenResponse,
  RedditApiHotResponse,
  RedditApiObjectKind,
  SortTime,
} from './reddit.types';

export function getObjectFullName(
  objectKind: RedditApiObjectKind,
  objectId: string
) {
  return `${objectKind}_${objectId}`;
}

export async function getAccessToken(appId: string, appSecret: string) {
  const response = await axios.post<RedditApiAccessTokenResponse>(
    'https://www.reddit.com/api/v1/access_token',
    new URLSearchParams({ grant_type: 'client_credentials' }).toString(),
    {
      auth: {
        username: appId,
        password: appSecret,
      },
    }
  );

  return response.data.access_token;
}

interface FetchListingsBaseProps {
  accessToken: string;
  limit?: number;
  /** @example "t3_2hus8s" */
  after?: string;
  /** @example "popular" */
  subreddit: string;
}

interface FetchListingsNewRisingProps extends FetchListingsBaseProps {
  kind: 'new' | 'rising';
}

interface FetchListingsHotProps extends FetchListingsBaseProps {
  kind: 'hot';
  hotLocation: HotLocation;
}

interface FetchListingsSortingProps extends FetchListingsBaseProps {
  kind: 'top' | 'controversial';
  sortTime: SortTime;
}

type FetchListingsProps =
  | FetchListingsNewRisingProps
  | FetchListingsHotProps
  | FetchListingsSortingProps;

export async function fetchListings(props: FetchListingsProps) {
  const response = await axios.get<RedditApiHotResponse>(
    `https://oauth.reddit.com/r/${props.subreddit}/${
      props.kind
    }.json?${new URLSearchParams({
      /** JSON without altered strings. Look for "response body encoding" in https://www.reddit.com/dev/api/ */
      raw_json: '1',
      ...(typeof props.limit !== 'undefined'
        ? { limit: String(props.limit) }
        : {}),
      ...(typeof props.after !== 'undefined' ? { after: props.after } : {}),
      ...(props.kind === 'hot' && typeof props.hotLocation !== 'undefined'
        ? { g: props.hotLocation }
        : {}),
      ...((props.kind === 'top' || props.kind === 'controversial') &&
      typeof props.sortTime !== 'undefined'
        ? { t: props.sortTime }
        : {}),
    })}`,
    {
      headers: { Authorization: `Bearer ${props.accessToken}` },
    }
  );

  return response.data;
}
