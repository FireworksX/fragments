import { createContext } from "preact";
import { FC, PropsWithChildren } from "preact/compat";
import { GraphState } from "@graph-state/core";

interface GraphStateContextValue {
  graphState?: GraphState;
}

export const GraphStateContext = createContext<GraphStateContextValue>({});

interface TemplateProviderProps extends PropsWithChildren {
  graphState: GraphState;
}

const GraphStateProvider: FC<TemplateProviderProps> = ({
  children,
  graphState,
}) => {
  return (
    <GraphStateContext.Provider value={{ graphState }}>
      {children}
    </GraphStateContext.Provider>
  );
};

export default GraphStateProvider;
