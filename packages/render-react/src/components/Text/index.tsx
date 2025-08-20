import { LinkKey } from "@graph-state/core";
import { ComponentPropsWithoutRef, ElementType, FC } from "react";
import { useTextAttributes } from "@fragmentsx/render-core";
import styles from "./styles.module.css";
import { UseTextAttributes } from "@fragmentsx/render-core/dist/components/Text/hooks/useTextAttributes";

interface TextProps extends ComponentPropsWithoutRef<"div">, UseTextAttributes {
  Tag?: string | ElementType;
  layerKey: LinkKey;
}

export const Text: FC<TextProps> = ({
  layerKey,
  Tag = "div",
  collectStyle,
  ...restProps
}) => {
  const { hash, content } = useTextAttributes(layerKey, { collectStyle });

  return (
    <Tag className={hash} data-key={layerKey} {...restProps}>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Tag>
  );
};
