import { Plugin } from "@graph-state/core";
import { createFetcher } from "./fetcher";
import { getFragmentQuery, QueryReturnSelf } from "./queries/FragmentQuery";
import { getEmptyFragment } from "./emptyFragment";
import { fetchBeacon } from "@/plugins/fetch/beacon";
import {
  AreaQueryReturn,
  getAreaQuery,
} from "@/plugins/fetch/queries/AreaQuery";

const BASE_ENV = {
  url: "http://localhost/graphql",
  isSelf: false,
};

interface AreaCacheEntity {
  fragmentId: number;
  props: Record<string, unknown>;
}

declare module "@graph-state/core" {
  interface GraphState {
    $fetch: {
      /**
       * Хранятся документы от фрагментов
       */
      cacheDocuments: Map<number, string>;
      cacheAreaDocuments: Map<string, AreaCacheEntity>;
      readFragment: (fragmentId: number) => string | null;
      readArea: (areaCode: string) => AreaCacheEntity | null;
      queryFragment: (fragmentId: number) => unknown;
      queryArea: (areaCode: string) => AreaCacheEntity;
      query: ReturnType<typeof createFetcher>["query"];
      sendBeacon: ReturnType<typeof fetchBeacon>["sendBeacon"];
    };
  }
}

export const fetchPlugin: Plugin = (state) => {
  const isSelf = state?.env?.isSelf ?? false;
  const url = state?.env?.backendEndpoint;
  const apiToken = state?.env?.apiToken;

  const fetcher = createFetcher(url, {
    Authorization: `Bearer ${apiToken}`,
  });
  const beaconFetcher = fetchBeacon(url);

  const queryFragment = async (fragmentId: number) => {
    if (!apiToken || !fragmentId) return null;

    if (state.$fetch.cacheDocuments.has(fragmentId)) {
      return state.$fetch.cacheDocuments.get(fragmentId);
    }

    const fragmentQuery = getFragmentQuery(fragmentId, isSelf);

    const response = await fetcher.query<typeof fragmentQuery._type>(
      fragmentQuery.query,
      fragmentQuery.variables
    );

    let fragment: QueryReturnSelf["fragment"][number] | null = null;

    if (!!response?.data && "clientFragment" in response.data) {
      fragment = response.data.clientFragment;
    }
    if (!!response?.data && "fragment" in response.data) {
      fragment = response.data.fragment?.at(0);
    }

    const fragmentDocument = fragment?.document;

    if (!fragmentDocument) {
      console.error("Empty document");
      return null;
    }
    if (fragment) {
      state.$fetch.cacheDocuments.set(fragmentId, fragmentDocument);

      if (Array.isArray(fragment.linkedFragments)) {
        fragment.linkedFragments.forEach((linkedFragment) =>
          state.$fetch.cacheDocuments.set(
            linkedFragment.id,
            linkedFragment.document
          )
        );
      }

      return fragmentDocument;
    }

    return null;
  };

  const queryArea = async (areaCode: string) => {
    if (!apiToken || !areaCode) return null;

    if (state.$fetch.cacheAreaDocuments.has(areaCode)) {
      return state.$fetch.cacheAreaDocuments.get(areaCode);
    }

    const areaQuery = getAreaQuery(areaCode);

    const response = await fetcher.query<AreaQueryReturn>(
      areaQuery.query,
      areaQuery.variables
    );

    const area = response?.data?.clientArea;

    if (area) {
      state.$fetch.cacheDocuments.set(
        area.variant.fragment.fragment.id,
        area.variant.fragment.fragment.document
      );

      if (Array.isArray(area.variant.fragment.fragment.linkedFragments)) {
        area.variant.fragment.fragment.linkedFragments.forEach(
          (linkedFragment) =>
            state.$fetch.cacheDocuments.set(
              linkedFragment.id,
              linkedFragment.document
            )
        );
      }

      const entity = {
        fragmentId: area.variant.fragment.fragment.id,
        props: area.variant.fragment.props,
      };
      state.$fetch.cacheAreaDocuments.set(areaCode, entity);

      return entity;
    }

    return null;

    // if (area) {
    //   state.$fetch.cacheDocuments.set(fragmentId, fragmentDocument);
    //   // state.cacheDocuments.set(fragmentId, getEmptyFragment(fragmentId));
    //
    //   if (Array.isArray(fragment.linkedFragments)) {
    //     fragment.linkedFragments.forEach((linkedFragment) =>
    //       state.$fetch.cacheDocuments.set(
    //         linkedFragment.id,
    //         linkedFragment.document
    //       )
    //     );
    //   }
    //
    //   state.$fetch.cacheLinks?.set(fragmentId, {
    //     document: state.$fetch.cacheDocuments.get(fragmentId),
    //     linkedFragments: fragment.linkedFragments ?? [],
    //   });
    //
    //   return state.$fetch.cacheLinks.get(fragmentId);
    // }
  };

  state.$fetch = {
    cacheDocuments: new Map(),
    cacheAreaDocuments: new Map(),
    queryFragment,
    queryArea,
    query: fetcher.query,
    sendBeacon: beaconFetcher.sendBeacon,
    readFragment: (fragmentId: number) =>
      state.$fetch.cacheDocuments.get(fragmentId) ?? null,
    readArea: (areaCode: string) =>
      state.$fetch.cacheAreaDocuments.get(areaCode) ?? null,
  };
};
