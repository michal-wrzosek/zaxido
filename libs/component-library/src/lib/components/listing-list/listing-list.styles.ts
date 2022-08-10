import styled from 'styled-components';
import { getThemeSelector } from '../../theme/theme-selector';
import { Themes } from '../../theme/themes';

export const listingListTheme = (_theme: Themes) => ({
  listingList: {
    gap: '1.6rem',
  },
});

const themeSelector = getThemeSelector('listingList');

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${themeSelector('gap')};
`;
