import { useGraph } from "@graph-state/react";
import { useFragmentManager } from "@/shared/hooks/useFragmentManager";

export const useFragmentProperties = (fragmentId: string) => {
  const { manager } = useFragmentManager(fragmentId);
  const [instanceFragment] = useGraph(manager, manager?.$fragment?.root);

  return {
    properties: instanceFragment?.properties ?? [],
    manager,
  };
};
