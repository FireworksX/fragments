import { createState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { fetchPlugin } from "@/plugins/fetch";
import { fragmentsPlugin } from "@/plugins/fragments";
import { metricsPlugin } from "@/plugins/metrics";
import { createConstants, isBrowser } from "@fragmentsx/utils";
import { loadPlugin } from "@/plugins/load";
import { globalStylesheetPlugin } from "@/plugins/styleSheet";
import { allowTypes } from "@graph-state/checkers";
import { globalManagerLifeCyclePlugin } from "@/plugins/lifecycle/globalManagerLifeCycle";

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
  backendEndpoint?: string;
}

let inited = false;

export const PLUGIN_TYPES = createConstants(
  "FragmentsPlugin",
  "GlobalStylesheet",
  "FragmentStylesheet"
);

export const createFragmentsClient = (options: Options) => {
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
        if (!options?.backendEndpoint) {
          throw new Error("Define backendEndpoint");
        }

        state.env = {
          isSelf: options?.isSelf ?? false,
          backendEndpoint: options?.backendEndpoint,
          apiToken: options?.apiToken,
        };

        state.$global = {
          status: null, // init, release
        };
      },
      fetchPlugin,
      fragmentsPlugin,
      loadPlugin,
      metricsPlugin,
      globalStylesheetPlugin,
      globalManagerLifeCyclePlugin,

      (state) => {
        if (isBrowser && !inited) {
          inited = true;
          if (!state?.env?.isSelf) {
            state?.$metrics?.initClient?.();

            window.addEventListener(
              "beforeunload",
              state?.$metrics?.releaseClient?.()
            );
          }
        }
      },
    ],
  });
};
