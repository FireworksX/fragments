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
}

export const Collection: FC<CollectionProps> = ({ layerKey, ...restProps }) => {
  const { fragmentManager, hash, source, children, sourceValue } =
    useCollection(layerKey);

  return (
    <Scope
      fragmentManager={fragmentManager}
      layerKey={layerKey}
      value={{
        type: definition.scopeTypes.CollectionScope,
        source,
        manager: fragmentManager,
      }}
    >
      {/* В FrameTag не пробрасываем layerKey, иначе будет рекурсия */}
      <div className={hash} data-key={layerKey}>
        {sourceValue?.map?.((collectionItem, index) => (
          <Scope
            fragmentManager={fragmentManager}
            layerKey={`${layerKey}.${index}`}
            value={{
              type: definition.scopeTypes.CollectionItemScope,
              source,
              value: collectionItem,
              manager: fragmentManager,
            }}
          >
            {children?.map((child) => (
              <Frame {...restProps} layerKey={child} />
            ))}
          </Scope>
        ))}
      </div>
    </Scope>
  );
};
