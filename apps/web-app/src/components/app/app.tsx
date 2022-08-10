import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { MainPage } from '../main-page';
import { ThemeProvider } from 'styled-components';
import { lightTheme } from '../../theme/theme';
import { IntlProvider } from 'react-intl';
import { GlobalStyles } from '../../theme/global-styles';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={lightTheme}>
        <IntlProvider locale="en">
          <GlobalStyles />
          <MainPage />
        </IntlProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};
