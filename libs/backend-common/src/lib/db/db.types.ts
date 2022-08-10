export interface DBListingPreviewItem {
  url: string;
  width: number;
  height: number;
}

export interface DBListingPreview {
  source: DBListingPreviewItem;
  resolutions: DBListingPreviewItem[];
}

export type DBSentiment = 'positive' | 'neutral' | 'negative';
export type DBListingKind = 't1' | 't2' | 't3' | 't4' | 't5' | 't6';

export interface DBListing {
  id: string;
  kind: DBListingKind;
  title: string;
  subreddit: string;
  permalink: string;
  author: string;
  numberOfComments: number;
  url: string;
  createdUTC: number;
  thumbnail: string;
  thumbnailWidth: number;
  thumbnailHeight: number;
  previews: DBListingPreview[];
  isVideo: boolean;
  isNSFW: boolean;
  ups: number;
  downs: number;
  sentiment: DBSentiment;
  updateId: number;
}

export interface DBListingsUpdateId {
  id: number;
  finished: boolean;
}
