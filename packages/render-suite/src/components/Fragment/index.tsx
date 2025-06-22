import { FC, useEffect, useRef } from "react";
import { definition } from "@fragmentsx/definition";
import { LinkKey } from "@graph-state/core";
import { useFragment } from "./hooks/useFragment";
import { FragmentProvider } from "./FragmentContext";
import { Frame } from "@/components/Frame";
import {
  FragmentContext,
  StyleSheetProvider,
  useFragmentManager,
  useGlobalManager,
} from "@fragmentsx/render-core";

interface FragmentProps {
  fragmentId: string;
  startLayer?: LinkKey;
}

const FragmentInternal: FC<FragmentProps> = ({ fragmentId }) => {
  const { children, hash, isTopFragment, fragmentContext, isResize } =
    useFragment(fragmentId);

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
    // <StyleSheetProvider value={manager?.styleSheetCache}>
    // <FragmentContext.Provider value={{ manager }}>
    <div
      // ref={setRef}
      data-key={`${definition.nodes.Fragment}:${fragmentId}`}
      className={hash}
    >
      {children.map((childLink) => {
        const childLayer = fragmentContext.manager?.resolve(childLink);
        const isPrimary = childLayer?.isPrimary ?? false;
        return (
          <Frame
            key={childLink}
            layerKey={childLink}
            hidden={!isResize && !isPrimary && !isTopFragment}
          />
        );
      })}
    </div>
    // </FragmentContext.Provider>
    // </StyleSheetProvider>
  );
};

export const Fragment = (props) => {
  const { manager: resultGlobalManager } = useGlobalManager();
  const { manager } = useFragmentManager(props.fragmentId, resultGlobalManager);

  return (
    <FragmentContext.Provider value={{ manager }}>
      {/*<StyleSheetProvider value={manager?.styleSheetCache}>*/}
      <FragmentInternal {...props} />
      {/*</StyleSheetProvider>*/}
    </FragmentContext.Provider>
  );
};
