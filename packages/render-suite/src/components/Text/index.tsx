import { LinkKey } from "@graph-state/core";
import cssStyles from "./styles.module.css";
import { useTextAttributes } from "@/components/Text/hooks/useTextAttributes";
import { FC, memo } from "react";

interface TextProps {
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = memo(({ layerKey }) => {
  const { styles, content } = useTextAttributes(layerKey);

  return (
    <div style={styles} data-key={layerKey}>
      <div
        className={cssStyles.text}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
});
