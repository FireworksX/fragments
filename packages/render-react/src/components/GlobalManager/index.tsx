import { GlobalManager as GlobalManagerCore } from "@fragmentsx/render-core";

export const GlobalManager = ({ children, value }) => {
  return <GlobalManagerCore value={value}>{children}</GlobalManagerCore>;
};
