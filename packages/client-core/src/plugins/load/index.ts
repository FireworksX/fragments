import { GraphState, Plugin } from "@graph-state/core";

declare module "@graph-state/core" {
  interface GraphState {
    $load: {
      loadFragment: (
        fragmentID: number,
        options?: LoadPluginOptions
      ) => GraphState;
      loadArea: (
        areaCode: string,
        options?: LoadPluginOptions
      ) => {
        fragmentId: number;
        props: unknown;
      };
    };
  }
}

interface LoadPluginOptions {
  suspense?: boolean;
}

export const loadPlugin: Plugin = (state) => {
  if (!["$fetch", "$fragments"].every((field) => field in state)) {
    console.error("LoadFragmentPlugin depends from Fetch and Fragments plugin");
    return state;
  }

  const resourceCache = new Map();

  const createSuspenseResource = (key: string, fetcher: () => Promise<any>) => {
    if (resourceCache.has(key)) return resourceCache.get(key);

    let status = "pending";
    let result: any;
    const suspender = fetcher().then(
      (r) => {
        status = "success";
        result = r;
      },
      (e) => {
        status = "error";
        result = e;
      }
    );

    const resource = {
      read() {
        if (status === "pending") throw suspender;
        if (status === "error") throw result;
        return result;
      },
    };

    resourceCache.set(key, resource);
    return resource;
  };

  const loadFragment = (fragmentId: number, options?: LoadPluginOptions) => {
    const suspense = options?.suspense;

    const readFragment = state?.$fetch?.readFragment(fragmentId);
    const fragmentManager = state?.$fragments?.getManager(fragmentId);

    if (readFragment && !fragmentManager) {
      return state.$fragments.createFragmentManager(fragmentId, readFragment);
    }

    if (readFragment && fragmentManager) return fragmentManager;

    const loader = async () => {
      const fragmentDocument = await state?.$fetch?.queryFragment(fragmentId);

      return state.$fragments.createFragmentManager(
        fragmentId,
        fragmentDocument
      );
    };

    if (suspense) {
      const resource = createSuspenseResource(fragmentId, loader);
      return resource.read(); // Suspense ждёт
    }

    return loader();
  };

  const loadArea = (areaCode: string, options?: LoadPluginOptions) => {
    const suspense = options?.suspense;

    const readArea = state?.$fetch?.readArea(areaCode);
    if (readArea) return readArea;

    const loader = async () => {
      const areaEntity = await state?.$fetch?.queryArea(areaCode);

      await loadFragment(areaEntity?.fragmentId, {
        suspense: false,
      });

      return areaEntity;
    };

    if (suspense) {
      const resource = createSuspenseResource(areaCode, loader);
      return resource.read(); // Suspense ждёт
    }

    return loader();
  };

  const readArea = () => {
    return state;
  };

  state.$load = {
    loadFragment,
    loadArea,
    readArea,
  };
};
