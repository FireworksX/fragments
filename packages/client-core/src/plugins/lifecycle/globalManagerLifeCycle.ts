import { LinkKey, Plugin } from "@graph-state/core";

interface LifeCycleGraph {
  _type: "LifeCycle";
  status: "init" | "release" | null;
}

declare module "@graph-state/core" {
  interface GraphState {
    $lifeCycle: {
      key: LinkKey;
      on: (
        callback: (graph: LifeCycleGraph) => void
      ) => ReturnType<GraphState["subscribe"]>;
    };
  }
}

export const globalManagerLifeCyclePlugin: Plugin = (state) => {
  const lifeCycleGraph = {
    _type: "LifeCycle",
    _id: "root",
    status: null,
  };

  const KEY = "LifeCycle:root";

  state.$lifeCycle = {
    key: "LifeCycle:root",
    on: (callback) => state.subscribe(KEY, callback as any),
  };

  state.mutate(lifeCycleGraph);
};
