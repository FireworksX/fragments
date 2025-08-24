import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { Scope } from "@/providers/Scope";
import { Frame } from "@/components/Frame";
import { ElementType, FC } from "react";
import { useCollection } from "@fragmentsx/render-core";

interface CollectionProps {
  FrameElement?: ElementType;
  layerKey: LinkKey;
}

export const Collection: FC<CollectionProps> = ({ layerKey, ...restProps }) => {
  const { children, fragmentManager, properties } = useCollection(layerKey);
  const FrameTag = restProps?.FrameElement ?? Frame;

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
        <FrameTag key={childLink} layerKey={childLink} {...restProps} />
      ))}
    </Scope>
  );
};
