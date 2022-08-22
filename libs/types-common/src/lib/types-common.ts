export type Sentiment = 'positive' | 'neutral' | 'negative';

export interface DBListingPreviewItem {
  url: string;
  width: number;
  height: number;
}

export interface DBListingPreview {
  source: DBListingPreviewItem;
  resolutions: DBListingPreviewItem[];
}

export type DBListingKind = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

export interface DBListing {
  redditId: string;
  kind: DBListingKind;
  title: string;
  subreddit: string;
  permalink: string;
  author: string;
  numberOfComments: number;
  url: string;
  createdUTC: number;
  thumbnail: string | null;
  thumbnailWidth: number | null;
  thumbnailHeight: number | null;
  previews: DBListingPreview[];
  isVideo: boolean;
  isNSFW: boolean;
  ups: number;
  downs: number;
}

export interface DBSentiment {
  redditId: string;
  sentiment: Sentiment;
}

export interface GatsbyImage {
  childImageSharp: {
    fluid: {
      aspectRatio: number;
      base64: string;
      sizes: string;
      src: string;
      srcSet: string;
    };
  } | null;
}

export interface GatsbyListing extends DBListing {
  thumbnailGatsby: GatsbyImage | null;
  previewsSourceUrlGatsby: GatsbyImage[];
}

export type Listing = DBListing | GatsbyListing;
