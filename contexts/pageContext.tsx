import { createContext, useContext, Context } from "react";

interface PageProviderProps<T> {
  value: T;
  children: JSX.Element;
}

export interface PageContent {
  token: string;
}

const PageContext: Context<PageContent> = createContext({ token: "" });

export const PageProvider = (props: PageProviderProps<PageContent>) => (
  <PageContext.Provider value={props.value}>{props.children}</PageContext.Provider>
);

export const usePage = () => useContext<PageContent>(PageContext);
