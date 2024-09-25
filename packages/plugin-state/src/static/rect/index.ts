import { Plugin } from "@graph-state/core";
import { roundedNumber } from "@fragments/utils";
import { Rect } from "@/types/rect.ts";

export const rectStatic: Plugin = (state) => {
  const minX = (rect: Rect) => {
    return rect.x;
  };
  const maxX = (rect: Rect) => {
    return rect.x + rect.width;
  };
  const minY = (rect: Rect) => {
    return rect.y;
  };
  const maxY = (rect: Rect) => {
    return rect.y + rect.height;
  };

  const multiply = (rect: Rect, n) => ({
    x: rect.x * n,
    y: rect.y * n,
    width: rect.width * n,
    height: rect.height * n,
  });

  const fromTwoPoints = (a, b) => ({
    x: Math.min(a.x, b.x),
    y: Math.min(a.y, b.y),
    width: Math.abs(a.x - b.x),
    height: Math.abs(a.y - b.y),
  });

  const fromRect = (rect: Rect) => ({
    x: rect.left,
    y: rect.top,
    width: rect.right - rect.left,
    height: rect.bottom - rect.top,
  });

  /**
   * Returns a rect containing all input rects
   */
  const merge = (...rect: Rect[]) => {
    const min = {
      x: Math.min(...rect.map(minX)),
      y: Math.min(...rect.map(minY)),
    };
    const max = {
      x: Math.max(...rect.map(maxX)),
      y: Math.max(...rect.map(maxY)),
    };
    return fromTwoPoints(min, max);
  };
  const intersection = (rect1: Rect, rect2: Rect) => {
    const x = Math.max(rect1.x, rect2.x);
    const x2 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width);
    const y = Math.max(rect1.y, rect2.y);
    const y2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height);
    return { x, y, width: x2 - x, height: y2 - y };
  };
  /**
   * Returns all the corner points for a rect
   */
  const points = (rect: Rect) => [
    { x: minX(rect), y: minY(rect) },
    { x: minX(rect), y: maxY(rect) },
    { x: maxX(rect), y: minY(rect) },
    { x: maxX(rect), y: maxY(rect) },
  ];

  /**
   * Checks if a rectangle contains a point
   */
  const containsPoint = (rect, point) => {
    if (point.x < minX(rect)) {
      return false;
    }
    if (point.x > maxX(rect)) {
      return false;
    }
    if (point.y < minY(rect)) {
      return false;
    }
    if (point.y > maxY(rect)) {
      return false;
    }
    if (isNaN(rect.x)) {
      return false;
    }
    if (isNaN(rect.y)) {
      return false;
    }
    return true;
  };

  const intersects = (rectA: Rect, rectB: Rect) => {
    return !(
      rectB.x >= maxX(rectA) ||
      maxX(rectB) <= rectA.x ||
      rectB.y >= maxY(rectA) ||
      maxY(rectB) <= rectA.y
    );
  };

  state.rect = {
    minX,
    minY,
    maxX,
    maxY,
    merge,
    intersection,
    intersects,
    // if the input rectangles are equal in size and position
    equals: (rect, other) => {
      if (rect === other) return true;
      if (!rect || !other) return false;
      return (
        rect.x === other.x &&
        rect.y === other.y &&
        rect.width === other.width &&
        rect.height === other.height
      );
    },
    atOrigin: (size) => {
      return { ...size, x: 0, y: 0 };
    },

    divide: (rect, n) => {
      return multiply(rect, 1 / n);
    },
    offset: (rect, delta) => {
      const xOffset = typeof delta.x === "number" ? delta.x : 0;
      const yOffset = typeof delta.y === "number" ? delta.y : 0;
      return {
        ...rect,
        x: rect.x + xOffset,
        y: rect.y + yOffset,
      };
    },
    inflate: (rect, value) => {
      if (value === 0) return rect;
      const doubleValue = 2 * value;
      return {
        x: rect.x - value,
        y: rect.y - value,
        width: rect.width + doubleValue,
        height: rect.height + doubleValue,
      };
    },
    pixelAligned: (rect) => {
      const x = Math.round(rect.x);
      const y = Math.round(rect.y);
      const rectMaxX = Math.round(rect.x + rect.width);
      const rectMaxY = Math.round(rect.y + rect.height);
      const width = Math.max(rectMaxX - x, 0);
      const height = Math.max(rectMaxY - y, 0);
      return { x, y, width, height };
    },
    halfPixelAligned: (rect) => {
      const x = Math.round(rect.x * 2) / 2;
      const y = Math.round(rect.y * 2) / 2;
      const rectMaxX = Math.round((rect.x + rect.width) * 2) / 2;
      const rectMaxY = Math.round((rect.y + rect.height) * 2) / 2;
      const width = Math.max(rectMaxX - x, 1);
      const height = Math.max(rectMaxY - y, 1);
      return { x, y, width, height };
    },
    round: (rect, decimals = 0) => {
      const x = roundedNumber(rect.x, decimals);
      const y = roundedNumber(rect.y, decimals);
      const width = roundedNumber(rect.width, decimals);
      const height = roundedNumber(rect.height, decimals);
      return { x, y, width, height };
    },
    roundToOutside: (rect) => {
      const x = Math.floor(rect.x);
      const y = Math.floor(rect.y);
      const rectMaxX = Math.ceil(rect.x + rect.width);
      const rectMaxY = Math.ceil(rect.y + rect.height);
      const width = Math.max(rectMaxX - x, 0);
      const height = Math.max(rectMaxY - y, 0);
      return { x, y, width, height };
    },

    positions: (rect) => {
      return {
        minX: rect.x,
        midX: rect.x + rect.width / 2,
        maxX: maxX(rect),
        minY: rect.y,
        midY: rect.y + rect.height / 2,
        maxY: maxY(rect),
      };
    },
    center: (rect) => {
      return {
        x: rect.x + rect.width / 2,
        y: rect.y + rect.height / 2,
      };
    },
    boundingRectFromPoints: (ps) => {
      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;
      for (let i = 0; i < ps.length; i++) {
        const point = ps[i];
        minX = Math.min(minX, point.x);
        maxX = Math.max(maxX, point.x);
        minY = Math.min(minY, point.y);
        maxY = Math.max(maxY, point.y);
      }
      return { x: minX, y: minY, width: maxX - minX, height: maxY - minY };
    },
    /**
     * Returns the precise box defined by the given points, starting from the top-left point. This produces the same
     * Rect as Rect.boundingRectFromPoints *only* when the rect described by the points is not rotated.
     */
    // fromPoints: (ps) => {
    //   const [tl, tr, _, bl] = ps;
    //   const { x, y } = tl;
    //   const width = Point.distance(tl, tr);
    //   const height = Point.distance(tl, bl);
    //   return { x, y, width, height };
    // },

    /**
     * Returns all the corner points for a rect at the origin.
     */
    pointsAtOrigin: (rect) => {
      return [
        { x: 0, y: 0 },
        { x: rect.width, y: 0 },
        { x: rect.width, y: rect.height },
        { x: 0, y: rect.height },
      ];
    },
    /** Takes a rect and transforms it by a matrix, resulting in the bounding rectangle of the
     * rotated and/or translated original.
     */
    transform: (rect, matrix) => {
      const { x: x1, y: y1 } = matrix.transformPoint({ x: rect.x, y: rect.y });
      const { x: x2, y: y2 } = matrix.transformPoint({
        x: rect.x + rect.width,
        y: rect.y,
      });
      const { x: x3, y: y3 } = matrix.transformPoint({
        x: rect.x + rect.width,
        y: rect.y + rect.height,
      });
      const { x: x4, y: y4 } = matrix.transformPoint({
        x: rect.x,
        y: rect.y + rect.height,
      });
      const x = Math.min(x1, x2, x3, x4);
      const width = Math.max(x1, x2, x3, x4) - x;
      const y = Math.min(y1, y2, y3, y4);
      const height = Math.max(y1, y2, y3, y4) - y;
      return { x, y, width, height };
    },

    /**
     * Returns wether a rect contains another rect entirely
     */
    containsRect: (rectA, rectB) => {
      for (const point of points(rectB)) {
        if (!containsPoint(rectA, point)) {
          return false;
        }
      }
      return true;
    },
    toCSS: (rect) => {
      return {
        display: "block",
        transform: `translate(${rect.x}px, ${rect.y}px)`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
      };
    },
    inset: (rect, n) => {
      return {
        x: rect.x + n,
        y: rect.y + n,
        width: Math.max(0, rect.width - 2 * n),
        height: Math.max(0, rect.height - 2 * n),
      };
    },
    overlapHorizontally: (rectA, rectB) => {
      const aMax = maxX(rectA);
      const bMax = maxX(rectB);
      return aMax > rectB.x && bMax > rectA.x;
    },
    overlapVertically: (rectA, rectB) => {
      const aMax = maxY(rectA);
      const bMax = maxY(rectB);
      return aMax > rectB.y && bMax > rectA.y;
    },
    doesNotIntersect: (rect, rects) => {
      return (
        rects.find((comparingRect) => {
          return intersects(comparingRect, rect);
        }) === undefined
      );
    },
    /**
     * @returns [tl, tr, br, bl]
     */
    cornerPoints: (rect) => {
      const rectMinX = rect.x;
      const rectMaxX = rect.x + rect.width;
      const rectMinY = rect.y;
      const rectMaxY = rect.y + rect.height;
      const corner1 = { x: rectMinX, y: rectMinY };
      const corner2 = { x: rectMaxX, y: rectMinY };
      const corner3 = { x: rectMaxX, y: rectMaxY };
      const corner4 = { x: rectMinX, y: rectMaxY };
      return [corner1, corner2, corner3, corner4];
    },
    midPoints: (rect) => {
      const rectMinX = rect.x;
      const rectMidX = rect.x + rect.width / 2;
      const rectMaxX = rect.x + rect.width;
      const rectMinY = rect.y;
      const rectMidY = rect.y + rect.height / 2;
      const rectMaxY = rect.y + rect.height;
      const top = { x: rectMidX, y: rectMinY };
      const right = { x: rectMaxX, y: rectMidY };
      const bottom = { x: rectMidX, y: rectMaxY };
      const left = { x: rectMinX, y: rectMidY };
      return [top, right, bottom, left];
    },
    // pointDistance: (rect, point) => {
    //   let x = 0;
    //   let y = 0;
    //   if (point.x < rect.x) {
    //     x = rect.x - point.x;
    //   } else if (point.x > maxX(rect)) {
    //     x = point.x - maxX(rect);
    //   }
    //   if (point.y < rect.y) {
    //     y = rect.y - point.y;
    //   } else if (point.y > maxY(rect)) {
    //     y = point.y - maxY(rect);
    //   }
    //   return Point.distance({ x, y }, { x: 0, y: 0 });
    // },
    fromAny: (
      rect,
      defaults = {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
      }
    ) => {
      return {
        x: rect.x || defaults.x,
        y: rect.y || defaults.y,
        width: rect.width || defaults.width,
        height: rect.height || defaults.height,
      };
    },
    delta: (a, b) => {
      const pointA = { x: minX(a), y: minY(a) };
      const pointB = { x: minX(b), y: minY(b) };
      return {
        x: pointA.x - pointB.x,
        y: pointA.y - pointB.y,
      };
    },
    withMinSize: (rect, minSize) => {
      const { width: minWidth, height: minHeight } = minSize;
      const diffX = rect.width - minWidth;
      const diffY = rect.height - minHeight;
      return {
        width: Math.max(rect.width, minWidth),
        height: Math.max(rect.height, minHeight),
        x: rect.width < minWidth ? rect.x + diffX / 2 : rect.x,
        y: rect.height < minHeight ? rect.y + diffY / 2 : rect.y,
      };
    },
    /**
     * Return false if any point is not inside or on the provided rect.
     */
    anyPointsOutsideRect: (rect, ps) => {
      const rectMinX = minX(rect);
      const rectMinY = minY(rect);
      const rectMaxX = maxX(rect);
      const rectMaxY = maxY(rect);
      for (const point of ps) {
        if (point.x < rectMinX || point.x > rectMaxX) {
          return true;
        }
        if (point.y < rectMinY || point.y > rectMaxY) {
          return true;
        }
      }
      return false;
    },
    // edges: (rect) => {
    //   const [tl, tr, br, bl] = Rect.cornerPoints(rect);
    //   return [Line(tl, tr), Line(tr, br), Line(br, bl), Line(bl, tl)];
    // },
    /**
     * Return a new rect projected into a new position based on the anchor rect and the given direction/alignment.
     */
    rebaseRectOnto: (rect, anchorRect, direction, alignment) => {
      const rebasedRect = { ...rect };
      switch (direction) {
        case "bottom":
        case "top":
          switch (alignment) {
            case "start":
              rebasedRect.x = anchorRect.x;
              break;
            case "center":
              rebasedRect.x =
                anchorRect.x + anchorRect.width / 2 - rect.width / 2;
              break;
            case "end":
              rebasedRect.x = anchorRect.x + anchorRect.width - rect.width;
              break;
            default:
            // assertNever(alignment);
          }
          break;
        case "left":
          rebasedRect.x = anchorRect.x - rect.width;
          break;
        case "right":
          rebasedRect.x = anchorRect.x + anchorRect.width;
          break;
        default:
        // assertNever(direction);
      }
      switch (direction) {
        case "left":
        case "right":
          switch (alignment) {
            case "start":
              rebasedRect.y = anchorRect.y;
              break;
            case "center":
              rebasedRect.y =
                anchorRect.y + anchorRect.height / 2 - rect.height / 2;
              break;
            case "end":
              rebasedRect.y = anchorRect.y + anchorRect.height - rect.height;
              break;
            default:
            // assertNever(alignment);
          }
          break;
        case "top":
          rebasedRect.y = anchorRect.y - rect.height;
          break;
        case "bottom":
          rebasedRect.y = anchorRect.y + anchorRect.height;
          break;
        default:
        // assertNever(direction);
      }
      return rebasedRect;
    },
  };
};
