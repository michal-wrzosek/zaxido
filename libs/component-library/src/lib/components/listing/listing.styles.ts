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
display:inline-block;
  color: #25274D;
  background: white;
  text-decoration: none;
  border: 1px solid #25274D;
  border-radius:4px;
  margin: 4px;
  padding:4px
`;
export const Thumbnail = styled.img`
  margin-top: ${themeSelector('thumbnailMarginTop')};
`;
export const ThumbnailWrapper = styled.div`
  width: 14rem;
  height: 14rem;
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
export const MainPart = styled.div`
  padding:5px;`;
export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  background: #8860D0;
  padding:5px;
  color: white;
  > svg {
    font-size: ${themeSelector('leftSideArrowsSize')};
  }
`;
export const Container = styled.div`
  display: flex;
  gap: ${themeSelector('sidesGap')};
  font-size: ${themeSelector('baseFontSize')};
  color: ${themeSelector('fontColor')};
  background:white;
`;
