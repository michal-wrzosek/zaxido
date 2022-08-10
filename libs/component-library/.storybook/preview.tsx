import React from 'react';
import { ThemeProvider } from 'styled-components';
import { DecoratorFn } from '@storybook/react';
import { IntlProvider } from 'react-intl';

import { lightTheme } from '../src/lib/theme/theme';
import { GlobalStyles } from '../src/lib/theme/global-styles';

export const decorators: DecoratorFn[] = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <IntlProvider locale="en">
        <GlobalStyles />
        <Story />
      </IntlProvider>
    </ThemeProvider>
  ),
];
