import { createContext, FC, PropsWithChildren } from "preact/compat";
import { useGlobalStyles } from "@/shared/hooks/useGlobalStyles";

export const GlobalManager = createContext(null);

export const GlobalManagerProvider: FC<PropsWithChildren> = ({
  children,
  value,
}) => {
  useGlobalStyles(value);

  return (
    <GlobalManager.Provider value={value}>{children}</GlobalManager.Provider>
  );
};
