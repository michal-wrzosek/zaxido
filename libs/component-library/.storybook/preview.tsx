import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DecoratorFn } from '@storybook/react';

import { lightTheme } from '../src/lib/theme/theme';
import { GlobalStyles } from '../src/lib/theme/global-styles';

export const decorators: DecoratorFn[] = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
