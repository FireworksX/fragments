import { LinkKey, Plugin } from "@graph-state/core";
import { generateCss } from "@/managers/cssPlugin/generateCss";
import { hashGenerator } from "@/managers/cssPlugin/hashGenerator";
import { diffCss } from "@/managers/cssPlugin/diffCss";

const toCSS = (styles: Record<string, string>) =>
  Object.entries(styles)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join("\n");

export const cssPlugin: Plugin = (state) => {
  state.generateCss = () => {
    const rules: string[] = [];
    const rootLayer = state.resolve(state.$fragment.root);
    const rootHash = hashGenerator(state.$fragment.root);
    const breakpoints = (rootLayer?.children ?? []).map(state.resolve);

    rules.push(`.${rootHash} { container-type: inline-size; }`);

    const primaryBreakpoint = breakpoints.find(
      (breakpoint) => breakpoint.isPrimary
    );

    const smaller = breakpoints
      .filter((f) => f.width < primaryBreakpoint.width)
      .sort((a, b) => b.width - a.width);

    const larger = breakpoints
      .filter((f) => f.width > primaryBreakpoint.width)
      .sort((a, b) => a.width - b.width);

    const primaryCss = generateCss(state, state.keyOfEntity(primaryBreakpoint));
    const primaryCssBlocks = {};
    primaryCss.forEach((block) => {
      primaryCssBlocks[block.hash] = block.css;
      rules.push(`.${block.hash} {${toCSS(block.css)}}`);
    });

    // Smaller breakpoints
    for (let i = 0; i < smaller.length; i++) {
      const frame = smaller[i];
      const next = smaller[i - 1];
      const max = i === 0 ? primaryBreakpoint.width - 1 : smaller[i - 1].width;

      const frameCss = generateCss(state, frame);
      // const styles = getDiffStyles(baseStyles, frame.styles);
      if (frameCss.length === 0) continue;

      const blocks = frameCss.reduce((acc, block) => {
        const primaryBlock = primaryCssBlocks[block.hash];
        acc += `.${block.hash} {${toCSS(diffCss(primaryBlock, block.css))}}`;
        return acc;
      }, "");

      rules.push(`@container (max-width: ${max}px) {${blocks}}`);
    }

    // Larger breakpoints
    for (let i = 0; i < larger.length; i++) {
      const frame = larger[i];
      const min = frame.width;
      const max = i < larger.length - 1 ? larger[i + 1].width - 1 : null;
      const frameCss = generateCss(state, frame);

      if (frameCss.length === 0) continue;
      const containerQuery = max
        ? `@container (min-width: ${min}px) and (max-width: ${max}px)`
        : `@container (min-width: ${min}px)`;

      const blocks = frameCss.reduce((acc, block) => {
        const primaryBlock = primaryCssBlocks[block.hash];

        console.log(
          block.hash,
          block.css,
          primaryBlock,
          diffCss(block.css, primaryBlock)
        );
        acc += `.${block.hash} {${toCSS(diffCss(primaryBlock, block.css))}}`;
        return acc;
      }, "");

      rules.push(`${containerQuery} {${blocks}}`);
    }

    return rules.join("");

    // const sortBreakpoints = breakpoints.sort((a, b) => a.width - b.width);
    //
    // const baseBreakpoint = generateCss(
    //   state,
    //   state.keyOfEntity(sortBreakpoints[0])
    // );
    //
    // const containerBreakpoints = sortBreakpoints
    //   .slice(1)
    //   .map((breakpoint) =>
    //     generateCss(state, state.keyOfEntity(breakpoint), true)
    //   );
    //
    // const fragmentCss = `.${rootHash} {
    //   container-type: inline-size;
    // }`;
    //
    // const baseBreakpointCss = `${baseBreakpoint[0].hash} {${baseBreakpoint[0].css}}`;
    //
    // console.log(baseBreakpoint, containerBreakpoints);
  };
};
