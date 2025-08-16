import {
  ElementType,
  FC,
  isValidElement,
  ReactElement,
  useContext,
  useEffect,
  useLayoutEffect,
} from "react";
import { LinkKey } from "@graph-state/core";
import { Frame } from "@/components/Frame";
import { Scope } from "@/providers/Scope";
import { definition } from "@fragmentsx/definition";
import {
  FragmentContext,
  GlobalManager,
  useFragment,
  useFragmentManager,
  useGlobalManager,
} from "@fragmentsx/render-core";

interface FragmentProps {
  FrameElement?: ElementType;
  globalManager?: unknown;
  fragmentId: string;
  startLayer?: LinkKey;
}

const FragmentInternal: FC<FragmentProps> = ({
  fragmentId,
  globalManager,
  FrameElement = Frame,
}) => {
  const {
    children,
    fragmentContext,
    hash,
    isResize,
    isTopFragment,
    definitions,
    layerKey,
  } = useFragment(fragmentId, globalManager);

  if (!fragmentContext.manager) return null;

  return (
    <Scope
      fragmentManager={fragmentContext.manager}
      layerKey={layerKey}
      value={{
        type: definition.scopeTypes.FragmentScope,
        manager: fragmentContext.manager,
        definitions,
      }}
    >
      <div data-key={layerKey} className={hash}>
        {children.map((childLink) => {
          const childLayer = fragmentContext.manager?.resolve(childLink);
          const isPrimary = childLayer?.isPrimary ?? false;

          return (
            <FrameElement
              key={childLink}
              layerKey={childLink}
              hidden={!isResize && !isPrimary && !isTopFragment}
              // style={{ display: isPrimary ? null : "none" }}
            />
          );
        })}
      </div>
    </Scope>
  );
};

export const Fragment = (props) => {
  const currentGlobalManager = useContext(GlobalManager);
  const { manager: resultGlobalManager } = useGlobalManager(
    props.globalManager
  );

  const { manager } = useFragmentManager(props.fragmentId, resultGlobalManager);

  const Base = (
    <FragmentContext.Provider value={{ manager }}>
      <FragmentInternal {...props} />
    </FragmentContext.Provider>
  );

  if (!currentGlobalManager) {
    return (
      <GlobalManager.Provider value={resultGlobalManager}>
        {Base}
      </GlobalManager.Provider>
    );
  }

  return Base;
};
