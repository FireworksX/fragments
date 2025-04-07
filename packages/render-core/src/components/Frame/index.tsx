import { FC } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import { useFrame } from "./hooks/useFrame";
import { Text } from "@/components/Text";
import { Instance } from "@/components/Instance";
import { definition } from "@fragmentsx/definition";

interface FrameProps {
  layerKey: LinkKey;
}

export const Frame: FC<FrameProps> = ({ layerKey }) => {
  const { styles, children, type } = useFrame(layerKey);

  if (type === definition.nodes.Text) {
    return <Text layerKey={layerKey} />;
  }

  if (type === definition.nodes.Instance) {
    return <Instance layerKey={layerKey} />;
  }

  return (
    <div style={styles} data-key={layerKey}>
      {children.map((childLink) => (
        <Frame key={childLink} layerKey={childLink} />
      ))}
    </div>
  );
};
