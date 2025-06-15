import { FC, useContext, useEffect } from "react";
import { LinkKey } from "@graph-state/core";
// import { Text } from "@/components/Text";
import { definition } from "@fragmentsx/definition";
import { FragmentContext, useFrame, useMounted } from "@fragmentsx/render-core";
import { Instance } from "@/components/Instance";
import { Text } from "@/components/Text";
import { isBrowser } from "@/helpers/isBrowser";

interface FrameProps {
  hidden?: boolean;
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey, hidden }) => {
  const { styles, hash, children, type, events, restProps, Tag } =
    useFrame(layerKey);
  const isMounted = useMounted();

  if (isMounted && hidden) {
    return null;
  }

  if (type === definition.nodes.Text) {
    return <Text layerKey={layerKey} />;
  }

  if (type === definition.nodes.Instance) {
    return <Instance layerKey={layerKey} />;
  }

  return (
    <Tag
      className={hash}
      data-key={layerKey}
      style={{ ...styles, display: hidden ? "none" : styles.display }}
      {...events}
      {...restProps}
    >
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </Tag>
  );
};
