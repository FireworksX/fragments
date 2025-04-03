import { createState } from "@graph-state/core";
import { getFragmentQuery } from "@/shared/managers/fetchManager/queries/FragmentQuery";
import { getEmptyFragment } from "@/shared/managers/fetchManager/emptyFragment";
import { createFetcher } from "./fetcher";

export const createFetchManager = (apiToken: string, isSelf?: boolean) => {
  const fetcher = createFetcher("http://localhost/graphql", {
    Authorization: `Bearer ${apiToken}`,
  });

  // const fetcher = (query, variables) => {
  //   return fetch(`http://localhost/graphql`, {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //       authorization:
  //         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0QHRlc3QudGVzdCIsImV4cCI6MTc0NjA3ODAwOH0.LmUkIlLO6c14vcEakbNRKtz5_DTIOOyDeZdFtUiSPDU",
  //     },
  //     body: JSON.stringify({ query, variables }),
  //   }).then((res) => res.json());
  // };

  return createState({
    initialState: {},
    plugins: [
      (state) => {
        state.cacheDocuments = new Map();

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
                state.cacheDocuments.set(
                  linkedFragment.id,
                  linkedFragment.document
                )
              );
            }

            return state.cacheDocuments.get(fragmentId);
          }

          return null;
        };
      },
    ],
  });
};
