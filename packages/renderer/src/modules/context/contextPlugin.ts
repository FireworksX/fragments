import { createState, Graph, Plugin } from "@graph-state/core";

export const contextPlugin: Plugin = (state) => {
  state.createFragmentState = (fragmentGraph: Graph) => {
    const currentState: any = state.resolve(state);

    const fragmentState = createState({
      type: "Fragment",
      initialState: fragmentGraph,
      plugins: currentState.fragmentPlugins ?? [],
    });

    state.mutate(state.key, {
      fragments: [fragmentState],
    });

    return fragmentState;
  };

  state.createAbstractState = (graph: Graph) => {
    const currentState: any = state.resolve(state);

    const abstractState = createState({
      type: "Abstract",
      initialState: graph,
      plugins: currentState.fragmentPlugins ?? [],
    });

    state.mutate(state.key, {
      abstracts: [abstractState],
    });

    return abstractState;
  };

  state.use = (plugin: Plugin) => {
    state.mutate(state.key, {
      fragmentPlugins: [plugin],
    });
  };

  return state;
};
