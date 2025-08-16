import { ElementType, FC, useContext, useEffect } from "react";
import { LinkKey } from "@graph-state/core";
import { definition } from "@fragmentsx/definition";
import { ScopeContext, useFrame, useMounted } from "@fragmentsx/render-core";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { UseFrameOptions } from "@fragmentsx/render-core/dist/components/Frame/hooks/useFrame";

interface FrameProps extends UseFrameOptions {
  TextElement?: ElementType;
  InstanceElement?: ElementType;
  FrameElement?: ElementType;
  styles?: boolean;
  hidden?: boolean;
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({
  layerKey,
  styles: inputStyles,
  hidden,
  ...restProps
}) => {
  const { styles, hash, children, type, events, linkProps, Tag } = useFrame(
    layerKey,
    restProps
  );
  const resultStyles = inputStyles ?? styles;
  const isMounted = useMounted();

  if (isMounted && hidden) {
    return <div />;
  }

  if (type === definition.nodes.Text) {
    const Tag = restProps?.TextElement ?? Text;
    return <Tag layerKey={layerKey} {...restProps} />;
  }

  if (type === definition.nodes.Instance) {
    const Tag = restProps?.InstanceElement ?? Instance;
    return <Tag layerKey={layerKey} {...restProps} />;
  }

  const FrameElement = restProps?.FrameElement ?? Frame;

  return (
    <Tag
      className={hash}
      data-key={layerKey}
      style={{
        ...resultStyles,
        display: hidden ? "none" : resultStyles.display,
      }}
      {...events}
      {...linkProps}
      {...restProps}
    >
      {children.map((childLink) => (
        <FrameElement key={childLink} layerKey={childLink} {...restProps} />
      ))}
    </Tag>
  );
};
