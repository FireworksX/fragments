import { LinkKey } from "@graph-state/core";
import { FC } from "react";
import { useTextAttributes } from "@fragmentsx/render-core";

interface TextProps {
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = ({ layerKey }) => {
  const { hash, content } = useTextAttributes(layerKey);

  return (
    <div className={hash} data-key={layerKey}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};
