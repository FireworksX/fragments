import { GraphState, Plugin } from "@graph-state/core";

interface LoadFragmentOptions {
  suspense?: boolean;
}

export const loadFragmentPlugin: Plugin = (state) => {
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

  const loadFragment = (fragmentId: number, options: LoadFragmentOptions) => {
    const suspense = options?.suspense;

    const readFragment = state?.$fetch?.readFragment(fragmentId);
    if (readFragment) return readFragment;

    const loader = async () => {
      const queryResult = await state?.$fetch?.queryFragment(fragmentId);
      const { document, linkedFragments } = queryResult ?? {};

      if (linkedFragments) {
        linkedFragments.forEach(({ id, document }) => {
          state.$fragments.createFragmentManager(id, document);
        });
      }

      return state.$fragments.createFragmentManager(fragmentId, document);
    };

    if (suspense) {
      const resource = createSuspenseResource(fragmentId, loader);
      return resource.read(); // Suspense ждёт
    }

    return loader();
  };

  state.$load = {
    loadFragment,
  };
};
