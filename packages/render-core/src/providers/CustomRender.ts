import { createContext, ReactNode } from "react";
import { LinkKey } from "@graph-state/core";

export const defaultCustomRender = (layerKey: LinkKey, node: ReactNode) => node;

export const CustomRender = createContext(defaultCustomRender);
