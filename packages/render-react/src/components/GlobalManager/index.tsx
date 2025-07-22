import { GlobalManager as GlobalManagerCore } from "@fragmentsx/render-core";

export const GlobalManager = ({ children, value }) => {
  return (
    <GlobalManagerCore.Provider value={value}>
      {children}
    </GlobalManagerCore.Provider>
  );
};
