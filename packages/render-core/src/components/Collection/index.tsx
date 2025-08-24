import { FC, useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useCollection } from "./hooks/useCollection";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { definition } from "@fragmentsx/definition";
import { useMounted } from "@/shared/hooks/useMounted";
import { Scope } from "@/providers/Scope";
import { Frame } from "@/components/Frame";

interface CollectionProps {
  layerKey: LinkKey;
  hidden?: boolean;
}

export const Collection: FC<CollectionProps> = ({ layerKey, hidden }) => {
  const { children, fragmentManager, properties } = useCollection(layerKey);

  return (
    <Scope
      fragmentManager={fragmentManager}
      layerKey={layerKey}
      value={{
        type: definition.scopeTypes.CollectionScope,
        manager: fragmentManager,
        definitions: properties,
      }}
    >
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </Scope>
  );
};
