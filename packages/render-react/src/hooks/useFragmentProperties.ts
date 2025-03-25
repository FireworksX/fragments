import { useGraph } from "@graph-state/react";
import { useFragmentManager } from "@/hooks/useFragmentManager";

export const useFragmentProperties = (fragmentId: number) => {
  const { manager } = useFragmentManager(fragmentId);
  const [instanceFragment] = useGraph(manager, manager?.$fragment?.root);

  return instanceFragment?.properties ?? [];
};
