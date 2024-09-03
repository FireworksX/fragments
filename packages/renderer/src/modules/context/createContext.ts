import { createState } from "@graph-state/core";
import { contextPlugin } from "./contextPlugin";

export const createContext = () =>
  createState({
    initialState: {
      fragments: [],
      fragmentPlugins: [],
      abstracts: [],
    },
    plugins: [contextPlugin],
    skip: [(f: any) => f && f?.key?.includes?.("Fragment")],
  });
