import React, { createContext, FC, PropsWithChildren, Suspense } from "react";
import { isBrowser } from "@/helpers/isBrowser";
import { serializeData } from "@/helpers/hydration";

interface GlobalManagerProps extends PropsWithChildren {
  value: unknown;
}

const data = {
  id: 15,
  document: {
    "Fragment:15": {
      _type: "Fragment",
      _id: "15",
      children: ["Frame:1240c0e860d2b", "Frame:7d0f4aebc272c8"],
      layoutSizingHorizontal: "Fixed",
      layoutSizingVertical: "Fixed",
      horizontalGrow: "auto",
      verticalGrow: "auto",
      renderMode: "parent",
      opacity: 1,
      visible: true,
      overflow: "hidden",
      overrides: [],
      properties: ["Variable:62218c840bd111"],
    },
    "Frame:1240c0e860d2b": {
      _type: "Frame",
      _id: "1240c0e860d2b",
      opacity: 1,
      visible: true,
      overflow: "visible",
      children: [],
      width: 181,
      height: 189,
      layoutSizingHorizontal: "Fixed",
      layoutSizingVertical: "Fixed",
      fillType: "Solid",
      positionType: "absolute",
      solidFill: "rgb(144, 136, 136)",
      name: "Frame",
      isPrimary: true,
      threshold: 320,
      parent: "$Fragment:15",
      overrides: ["Frame:7d0f4aebc272c8"],
    },
    "Frame:7d0f4aebc272c8": {
      _type: "Frame",
      overrideFrom: "$Frame:1240c0e860d2b",
      parent: "$Fragment:15",
      name: "Mobile",
      threshold: 375,
      top: 0,
      left: 371,
      width: 375,
      isBreakpoint: true,
      isPrimary: false,
      _id: "7d0f4aebc272c8",
      children: [],
      solidFill: "rgb(214, 116, 116)",
    },
    "Variable:62218c840bd111": {
      _type: "Variable",
      _id: "62218c840bd111",
    },
  },
  linkedFragments: [],
};

export const GlobalManagerContext = createContext(null);

export const GlobalManager: FC<GlobalManagerProps> = ({ value, children }) => {
  return (
    <GlobalManagerContext.Provider value={value}>
      {children}
    </GlobalManagerContext.Provider>
  );
};
