import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { Scope } from "@/providers/Scope";
import { Frame, FrameProps } from "@/components/Frame";
import { ElementType, FC } from "react";
import { getCssVariables, useCollection } from "@fragmentsx/render-core";

interface CollectionProps extends FrameProps {}

export const Collection: FC<CollectionProps> = ({
  layerKey,
  styles: inputStyles,
  ...restProps
}) => {
  const { fragmentManager, styles, hash, source, children, sourceValue } =
    useCollection(layerKey);
  const FrameTag = restProps?.FrameTag ?? "div";
  const FrameElement = restProps?.FrameElement ?? Frame;
  const resultStyles = inputStyles ?? styles;

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
      <FrameTag
        className={hash}
        data-key={layerKey}
        style={resultStyles}
        {...restProps}
      >
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
              <div
                key={child}
                style={{
                  display: "contents",
                  ...getCssVariables(collectionItem ?? {}),
                }}
              >
                <FrameElement {...restProps} layerKey={child} />
              </div>
            ))}
          </Scope>
        ))}
      </FrameTag>
    </Scope>
  );
};
