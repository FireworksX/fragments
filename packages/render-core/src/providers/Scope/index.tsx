import { FC, PropsWithChildren, useContext } from "preact/compat";
import { ScopeContext } from "@/providers/Scope/ScopeContext";
import { GraphState, LinkKey } from "@graph-state/core";

interface ScopeProps extends PropsWithChildren {
  fragmentManager: GraphState;
  layerKey: LinkKey;
  value: unknown;
}

export const Scope: FC<ScopeProps> = ({
  value,
  children,
  fragmentManager,
  layerKey,
}) => {
  const currentScope = useContext(ScopeContext) ?? [];
  const nextScope = [...currentScope, value];

  fragmentManager?.$scopes?.registerScope?.(layerKey, nextScope);

  return (
    <ScopeContext.Provider value={nextScope}>{children}</ScopeContext.Provider>
  );
};
