import { Plugin } from "@graph-state/core";
import { getLandingQuery } from "@/managers/fetchPlugin/queries/LandingQuery";
import { getFragmentQuery } from "@/managers/fetchPlugin/queries/FragmentQuery";
import { getEmptyFragment } from "@/managers/fetchPlugin/emptyFragment";
import { createFetcher } from "@/managers/fetchPlugin/fetcher";

interface ExtendedState {
  cacheDocuments: Map<string, unknown>;
}

export const plugin =
  (apiToken: string, isSelf): Plugin =>
  (state: ExtendedState) => {
    const fetcher = createFetcher("http://localhost/graphql", {
      Authorization: `Bearer ${apiToken}`,
    });

    state.cacheDocuments = new Map();

    state.queryLanding = async () => {
      if (!apiToken) return null;

      const response = await fetcher.query(getLandingQuery(), {});
    };

    state.queryFragment = async (fragmentId: number) => {
      if (!apiToken) return null;

      if (state.cacheDocuments.has(fragmentId)) {
        return state.cacheDocuments.get(fragmentId);
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
        state.cacheDocuments.set(fragmentId, fragmentDocument);
        // state.cacheDocuments.set(fragmentId, getEmptyFragment(fragmentId));

        if (Array.isArray(fragment.linkedFragments)) {
          fragment.linkedFragments.forEach((linkedFragment) =>
            state.cacheDocuments.set(linkedFragment.id, linkedFragment.document)
          );
        }

        return {
          document: state.cacheDocuments.get(fragmentId),
          linkedFragments: fragment.linkedFragments ?? [],
        };
      }

      return null;
    };
  };
