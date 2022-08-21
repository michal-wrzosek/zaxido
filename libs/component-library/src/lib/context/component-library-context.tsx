import React, { createContext, PropsWithChildren, useContext } from 'react';

export type ComponentLibraryContextAppType = 'cra' | 'gatsby';

export interface ComponentLibraryContextValue {
  appType: ComponentLibraryContextAppType;
}

const ComponentLibraryContext = createContext<
  ComponentLibraryContextValue | undefined
>(undefined);

export type ComponentLibraryContextProviderProps = {
  contextValue: ComponentLibraryContextValue;
};

export const ComponentLibraryContextProvider = ({
  contextValue,
  children,
}: PropsWithChildren<ComponentLibraryContextProviderProps>) => {
  return (
    <ComponentLibraryContext.Provider value={contextValue}>
      {children}
    </ComponentLibraryContext.Provider>
  );
};

export const useComponentLibraryContext = () => {
  const contextValue = useContext(ComponentLibraryContext);

  if (!contextValue)
    throw new Error(
      'You probably forgot to wrap your app inside ComponentLibraryContextProvider!'
    );

  return contextValue;
};
