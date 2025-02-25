import { useGraph } from "@graph-state/react";
import { useGlobalContext } from "@/shared/hooks/useGlobalContext.ts";

export const useFragmentManager = (fragmentId: string | number) => {
  const context = useGlobalContext();
  if (!context) {
    throw new Error(
      "Need declare global context. Use <FragmentsGlobalContext> and createGlobalContext."
    );
  }

  const [globalContextGraph] = useGraph(
    context.globalContext,
    context.globalContext?.key
  );

  return globalContextGraph?.fragmentsManagers?.[fragmentId];
};
