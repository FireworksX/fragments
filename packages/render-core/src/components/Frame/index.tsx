import { FC, useContext } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useFrame } from "./hooks/useFrame";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { definition } from "@fragmentsx/definition";

interface FrameProps {
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey }) => {
  const { events, hash, children, type, restProps, Tag } = useFrame(layerKey);

  if (type === definition.nodes.Text) {
    return <Text layerKey={layerKey} />;
  }

  if (type === definition.nodes.Instance) {
    return <Instance layerKey={layerKey} />;
  }

  return (
    <Tag className={hash} data-key={layerKey} {...events} {...restProps}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </Tag>
  );
};
