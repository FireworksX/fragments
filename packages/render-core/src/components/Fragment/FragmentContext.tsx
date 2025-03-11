import { createContext } from "preact/compat";

export const FragmentContext = createContext({
  manager: null,
});

export const FragmentProvider = ({ children, manager }) => {
  return (
    <FragmentContext.Provider value={{ manager }}>
      {children}
    </FragmentContext.Provider>
  );
};
