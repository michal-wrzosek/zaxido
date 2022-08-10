import { gql } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Listing = {
  __typename?: 'Listing';
  author: Scalars['String'];
  createdUTC: Scalars['Int'];
  downs: Scalars['Int'];
  id: Scalars['String'];
  isNSFW: Scalars['Boolean'];
  isVideo: Scalars['Boolean'];
  kind: ListingKind;
  numberOfComments: Scalars['Int'];
  permalink: Scalars['String'];
  previews: Array<ListingPreview>;
  sentiment: Sentiment;
  subreddit: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  thumbnailHeight?: Maybe<Scalars['Int']>;
  thumbnailWidth?: Maybe<Scalars['Int']>;
  title: Scalars['String'];
  updateId: Scalars['Int'];
  ups: Scalars['Int'];
  url: Scalars['String'];
};

export enum ListingKind {
  T1 = 'T1',
  T2 = 'T2',
  T3 = 'T3',
  T4 = 'T4',
  T5 = 'T5',
  T6 = 'T6',
}

export type ListingPreview = {
  __typename?: 'ListingPreview';
  resolutions: Array<ListingPreviewItem>;
  source: ListingPreviewItem;
};

export type ListingPreviewItem = {
  __typename?: 'ListingPreviewItem';
  height: Scalars['Int'];
  url: Scalars['String'];
  width: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  listings: Array<Listing>;
};

export enum Sentiment {
  Negative = 'NEGATIVE',
  Neutral = 'NEUTRAL',
  Positive = 'POSITIVE',
}
