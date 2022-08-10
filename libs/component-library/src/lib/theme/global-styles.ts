import { createGlobalStyle, css } from 'styled-components';

import { normalizeCss } from './normalize-css';

export const globalStylesCss = css`
  ${normalizeCss};

  html {
    /**
    * You need to add these link tags into <head /> tag in your app
    * <link rel="preconnect" href="https://fonts.googleapis.com">
    * <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    * <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap" rel="stylesheet">
    */
    font-family: 'Roboto', sans-serif;
    font-size: 62.5%;
    box-sizing: border-box;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
`;

export const GlobalStyles = createGlobalStyle`
  ${globalStylesCss};
`;
