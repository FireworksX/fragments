import { FC, useEffect, useRef } from "react";
import { definition } from "@fragmentsx/definition";
import { LinkKey } from "@graph-state/core";
import { useFragment } from "./hooks/useFragment";
import { FragmentProvider } from "./FragmentContext";
import styles from "./styles.module.css";
import { Frame } from "@/components/Frame";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

export const Fragment: FC<FragmentProps> = ({ fragmentId }) => {
  const { setRef, children, manager, isDocument } = useFragment(fragmentId);

  // const testRef = useRef();
  //
  // useEffect(() => {
  //   console.log(testRef.current);
  //
  //   if (testRef.current) {
  //     const ob = new ResizeObserver((entries) => {
  //       console.log(entries);
  //     });
  //     ob.observe(testRef.current);
  //   }
  // }, []);

  return (
    <FragmentProvider manager={manager}>
      <div
        ref={setRef}
        data-key={`${definition.nodes.Fragment}:${fragmentId}`}
        className={isDocument ? styles.fragmentDocument : styles.fragment}
        style={styles}
      >
        {children.map((childLink) => (
          <Frame key={childLink} layerKey={childLink} />
        ))}
      </div>
    </FragmentProvider>
  );
};
