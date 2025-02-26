import { use } from "react";
import { FragmentsGlobalContext } from "@/components/FragmentsGlobalContext";
import { useGraph } from "@graph-state/react";

export const useGlobalContext = () => {
  const context = use(FragmentsGlobalContext);
  const [contextGraph] = useGraph(
    context.globalContext,
    context.globalContext.key
  );

  const getFragmentManager = (id: string) =>
    contextGraph?.fragmentsManagers?.[id];

  return {
    contextGraph,
    context,
    getFragmentManager,
  };
};
