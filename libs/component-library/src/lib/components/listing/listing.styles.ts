import styled from 'styled-components';

import { getThemeSelector } from '../../theme/theme-selector';
import { Themes } from '../../theme/themes';

export const listingTheme = (theme: Themes) => ({
  listing: {
    baseFontSize: '1rem',
    fontColor: theme === 'dark' ? 'white' : 'black',
    topBarGap: '0.8rem',
    titleFontSize: '1.6rem',
    titleFontWeight: '500',
    thumbnailMarginTop: '0.4rem',
    leftSideArrowsSize: '1.6rem',
    sidesGap: '1.2rem',
  },
});

const themeSelector = getThemeSelector('listing');

export const Comments = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
`;
export const Thumbnail = styled.img`
  margin-top: ${themeSelector('thumbnailMarginTop')};
`;
export const Title = styled.a`
  display: block;
  color: inherit;
  text-decoration: none;
  font-weight: ${themeSelector('titleFontWeight')};
  font-size: ${themeSelector('titleFontSize')};
`;
export const Author = styled.div``;
export const Subreddit = styled.div``;
export const TopBar = styled.div`
  display: flex;
  gap: ${themeSelector('topBarGap')};
`;
export const MainPart = styled.div``;
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;

  > svg {
    font-size: ${themeSelector('leftSideArrowsSize')};
  }
`;
export const Container = styled.div`
  display: flex;
  gap: ${themeSelector('sidesGap')};
  font-size: ${themeSelector('baseFontSize')};
  color: ${themeSelector('fontColor')};
`;
