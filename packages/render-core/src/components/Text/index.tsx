import { FC } from "preact/compat";
import { LinkKey } from "@graph-state/core";
import cssStyles from "./styles.module.css";
import { useTextAttributes } from "@/components/Text/hooks/useTextAttributes";

interface TextProps {
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = ({ layerKey }) => {
  const { hash, content } = useTextAttributes(layerKey);

  return (
    <div className={hash} data-key={layerKey}>
      <div
        className={cssStyles.text}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
};
