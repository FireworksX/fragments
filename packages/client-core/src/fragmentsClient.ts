import { createState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { fetchPlugin } from "@/plugins/fetch";
import { fragmentsPlugin } from "@/plugins/fragments";
import { metricsPlugin } from "@/plugins/metrics";
import { isBrowser } from "@fragmentsx/utils";
import { loadFragmentPlugin } from "@/plugins/loadFragment";

interface Options {
  apiToken: string;
  isSelf?: boolean;
}

let inited = false;

export const createFragmentsClient = (options: Options) => {
  return createState({
    _type: "GlobalManager",
    initialState: {},
    plugins: [
      (state) => {
        state.env = {
          isSelf: options?.isSelf ?? false,
          url: options?.url,
          apiToken: options?.apiToken,
        };

        state.$global = {
          status: null, // init, release
        };

        state.extractStyles = async () => {
          const allFragments = state.$fragments.getManagers();
          const extractors = Object.entries(allFragments)
            .filter(([, value]) => !!value?.resolve)
            .map(([, manager]) => manager.$styleSheet.extract());

          const extractedStyles = await Promise.all(extractors);

          return Object.values(
            extractedStyles.reduce((acc, extrected) => {
              Object.entries(extrected).forEach(([key, styleTag]) => {
                acc[key] = styleTag;
              });

              return acc;
            }, {})
          );
        };
      },
      fetchPlugin,
      fragmentsPlugin,
      loadFragmentPlugin,
      metricsPlugin,

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
