import { FC, PropsWithChildren, useContext } from "react";
import { ScopeContext } from "@fragmentsx/render-core";
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

  fragmentManager?.$scopes?.registerScope?.(layerKey, value);

  return (
    <ScopeContext.Provider value={nextScope}>{children}</ScopeContext.Provider>
  );
};
