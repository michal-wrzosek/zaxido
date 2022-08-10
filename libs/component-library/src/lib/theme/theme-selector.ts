import { DefaultTheme, ThemeProps } from 'styled-components';
import { themeKey } from './theme-key';

type Components = DefaultTheme[typeof themeKey]['components'];

/**
 * Utility helping with selecting component related styles from the theme
 *
 * @example
 * const exampleComponentTheme = (theme) => ({
 *   exampleComponent: {
 *     background: theme === 'dark' ? 'black' : 'white';
 *   }
 * });
 *
 * const themeSelector = getThemeSelector('exampleComponent');
 *
 * const ExampleComponentContainer = styled.div`
 *   background: ${themeSelector('background)};
 * `;
 */
export const getThemeSelector =
  <T extends keyof Components>(componentName: T) =>
  (whatToSelect: keyof Components[T]) =>
  ({ theme }: ThemeProps<DefaultTheme>) =>
    theme[themeKey].components[componentName][whatToSelect];
