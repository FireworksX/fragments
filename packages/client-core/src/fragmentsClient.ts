import { createState, Plugin } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { fetchPlugin } from "@/plugins/fetch";
import { fragmentsPlugin } from "@/plugins/fragments";
import { globalMetricsPlugin } from "@/plugins/metrics/globalMetrics";
import { createConstants, isBrowser } from "@fragmentsx/utils";
import { loadPlugin } from "@/plugins/load";
import { globalStylesheetPlugin } from "@/plugins/styleSheet";
import { allowTypes } from "@graph-state/checkers";

declare module "@graph-state/core" {
  interface GraphState {
    env: {
      isSelf: boolean;
      apiToken: string;
      backendEndpoint: string;
    };
  }
}

interface Options {
  apiToken: string;
  isSelf?: boolean;
  fragmentPlugins?: Plugin[];
}

export const PLUGIN_TYPES = createConstants(
  "FragmentsPlugin",
  "GlobalStylesheet",
  "FragmentStylesheet"
);

export const createFragmentsClient = (options: Options) => {
  const BACKEND_TARGET = options?.isSelf
    ? "/graphql"
    : "http://85.192.29.65/graphql";

  return createState({
    _type: "GlobalManager",
    initialState: {},
    skip: [
      allowTypes([
        ...Object.keys(definition.nodes),
        ...Object.keys(PLUGIN_TYPES),
      ]),
    ],
    plugins: [
      (state) => {
        state.env = {
          isSelf: options?.isSelf ?? false,
          backendEndpoint: BACKEND_TARGET,
          apiToken: options?.apiToken,
        };
      },
      fetchPlugin,
      fragmentsPlugin({
        plugins: options?.fragmentPlugins,
      }),
      loadPlugin,
      globalMetricsPlugin,
      globalStylesheetPlugin,
    ],
  });
};
