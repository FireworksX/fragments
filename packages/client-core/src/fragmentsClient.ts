import { createState } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { fetchPlugin } from "@/plugins/fetch";
import { fragmentsPlugin } from "@/plugins/fragments";

interface Options {
  apiToken: string;
  isSelf?: boolean;
}

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
    ],
  });
};
