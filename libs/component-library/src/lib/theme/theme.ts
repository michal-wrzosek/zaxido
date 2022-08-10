import { listingTheme } from '../components/listing';
import { listingListTheme } from '../components/listing-list/listing-list.styles';
import { themeKey } from './theme-key';

export const lightTheme = {
  [themeKey]: {
    components: {
      ...listingTheme('light'),
      ...listingListTheme('light'),
    },
  },
};

export const darkTheme = {
  [themeKey]: {
    components: {
      ...listingTheme('dark'),
      ...listingListTheme('dark'),
    },
  },
};
