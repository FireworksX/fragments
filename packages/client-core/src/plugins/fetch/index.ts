import { Plugin } from "@graph-state/core";
import { createFetcher } from "./fetcher";
import { getFragmentQuery } from "./queries/FragmentQuery";
import { getEmptyFragment } from "./emptyFragment";

const BASE_ENV = {
  url: "http://localhost/graphql",
  isSelf: false,
};

export const fetchPlugin: Plugin = (state) => {
  const url = state?.env?.url ?? "http://localhost/graphql";
  const isSelf = state?.env?.isSelf ?? false;
  const apiToken = state?.env?.apiToken;

  const fetcher = createFetcher(url, {
    Authorization: `Bearer ${apiToken}`,
  });

  const queryFragment = async (fragmentId: number) => {
    if (!apiToken) return null;

    if (state.$fetch.cacheLinks.get(fragmentId)) {
      return state.$fetch.cacheLinks.get(fragmentId);
    }

    const response = await fetcher.query(getFragmentQuery(isSelf), {
      fragmentSlug: fragmentId,
    });

    const fragment = isSelf
      ? response?.data?.fragment?.[0]
      : response?.data?.clientFragment;
    let fragmentDocument = fragment?.document;

    if (typeof fragmentDocument === "string") {
      try {
        if (Object.keys(JSON.parse(fragmentDocument)).length === 0) {
          fragmentDocument = getEmptyFragment(fragmentId);
        }
      } catch (e) {
        console.error(e);
      }
    }

    if (fragment) {
      state.$fetch.cacheDocuments.set(fragmentId, fragmentDocument);
      // state.cacheDocuments.set(fragmentId, getEmptyFragment(fragmentId));

      if (Array.isArray(fragment.linkedFragments)) {
        fragment.linkedFragments.forEach((linkedFragment) =>
          state.$fetch.cacheDocuments.set(
            linkedFragment.id,
            linkedFragment.document
          )
        );
      }

      state.$fetch.cacheLinks?.set(fragmentId, {
        document: state.$fetch.cacheDocuments.get(fragmentId),
        linkedFragments: fragment.linkedFragments ?? [],
      });

      return state.$fetch.cacheLinks.get(fragmentId);
    }

    return null;
  };

  state.$fetch = {
    cacheDocuments: new Map(),
    cacheLinks: new Map(),
    queryFragment,
    readFragment: (fragmentId: number) =>
      state.$fetch.cacheDocuments.get(fragmentId),
  };
};
