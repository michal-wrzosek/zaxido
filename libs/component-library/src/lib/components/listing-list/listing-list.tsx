import React from 'react';
import * as Types from './listing-list.types';
import * as Styles from './listing-list.styles';
import { Listing } from '../listing/listing';

export const ListingList = ({ listings }: Types.ListingListProps) => {
  return (
    <Styles.Container>
      {listings.map((listing) => (
        <Listing key={listing.redditId} listing={listing} />
      ))}
    </Styles.Container>
  );
};
