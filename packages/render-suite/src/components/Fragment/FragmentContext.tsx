import { FragmentContext } from "@fragmentsx/render-core";

export const FragmentProvider = ({ children, manager }) => {
  return (
    <FragmentContext.Provider value={{ manager }}>
      {children}
    </FragmentContext.Provider>
  );
};
