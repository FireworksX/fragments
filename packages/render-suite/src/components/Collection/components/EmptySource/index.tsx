import React, { FC } from "react";
import { animated, SpringValue } from "@react-spring/web";
import { LinkKey } from "@graph-state/core";
import cssStyles from "./styles.module.css";

interface EmptySourceProps {
  layerKey: LinkKey;
  styles: Record<string, SpringValue>;
}

export const EmptySource: FC<EmptySourceProps> = ({ styles, layerKey }) => {
  return (
    <animated.div data-key={layerKey} className={cssStyles.root} style={styles}>
      <div className={cssStyles.title}>No items within Collection source</div>
      <div className={cssStyles.description}>
        Add few items in Collection for display rendered items.
      </div>
    </animated.div>
  );
};
