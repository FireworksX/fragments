import { FC, useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useFrame } from "./hooks/useFrame";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { definition } from "@fragmentsx/definition";
import { useMounted } from "@/shared/hooks/useMounted";

interface CollectionProps {
  layerKey: LinkKey;
  hidden?: boolean;
}

export const Collection: FC<CollectionProps> = ({ layerKey, hidden }) => {
  const { events, styles, hash, children, type, restProps, Tag } =
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
