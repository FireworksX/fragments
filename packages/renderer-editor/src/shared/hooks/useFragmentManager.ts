import { useGlobalContext } from "@/shared/hooks/useGlobalContext.ts";

export const useFragmentManager = (fragmentId: string | number) => {
  const { contextGraph, getFragmentManager } = useGlobalContext();
  if (!contextGraph) {
    throw new Error(
      "Need declare global context. Use <FragmentsGlobalContext> and createGlobalContext."
    );
  }

  return getFragmentManager(fragmentId);
};
