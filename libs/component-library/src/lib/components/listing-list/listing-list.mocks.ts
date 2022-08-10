import { exampleListing } from '../listing/listing.mocks';

export const exampleListings = Array(4)
  .fill(exampleListing)
  .map((listing, index) => ({
    ...listing,
    id: String(index),
  }));
