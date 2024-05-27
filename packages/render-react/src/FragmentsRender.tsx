import {
  forwardRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";

interface Props {
  FragmentNode: any;
  appendTo?: () => HTMLDivElement | undefined;
}

export const FragmentsRender = forwardRef(
  ({ FragmentNode, appendTo, ...restProps }: Props, ref) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);

    const render = useCallback(() => {
      if (!FragmentNode) {
        console.log(`Template and ID is required`);
      } else {
        FragmentNode(wrapperRef.current, restProps);

        if (appendTo && wrapperRef?.current) {
          appendTo()?.append(wrapperRef.current);
        }
      }
    }, [FragmentNode, ref, appendTo]);

    useEffect(render);

    useLayoutEffect(render, []);

    return <div ref={wrapperRef} />;
  }
);

FragmentsRender.displayName = "FragmentRender";
