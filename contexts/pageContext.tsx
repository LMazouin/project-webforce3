import { createContext, useContext, Context } from "react";

interface PageProviderProps<T> {
  value: T;
  children: JSX.Element;
}

export interface PageContent {
  decodedToken: { [key: string]: any };
}

const PageContext: Context<PageContent> = createContext({ decodedToken: {} });

export const PageProvider = (props: PageProviderProps<PageContent>) => (
  <PageContext.Provider value={props.value}>{props.children}</PageContext.Provider>
);

export const usePage = () => useContext<PageContent>(PageContext);
