import { roundedNumber } from '@fragmentsx/utils'

export class Rect {
  static minX(rect: RectType) {
    return rect.x
  }
  static maxX(rect: RectType) {
    return rect.x + rect.width
  }
  static minY(rect: RectType) {
    return rect.y
  }
  static maxY(rect: RectType) {
    return rect.y + rect.height
  }

  static multiply(rect: RectType, n) {
    return {
      x: rect.x * n,
      y: rect.y * n,
      width: rect.width * n,
      height: rect.height * n
    }
  }

  static fromTwoPoints(a, b) {
    return {
      x: Math.min(a.x, b.x),
      y: Math.min(a.y, b.y),
      width: Math.abs(a.x - b.x),
      height: Math.abs(a.y - b.y)
    }
  }

  static fromRect(rect: RectType) {
    return {
      x: rect.left,
      y: rect.top,
      width: rect.right - rect.left,
      height: rect.bottom - rect.top
    }
  }

  /**
   * Returns a rect containing all input rects
   */
  static merge(...rect: RectType[]) {
    const min = {
      x: Math.min(...rect.map(this.minX)),
      y: Math.min(...rect.map(this.minY))
    }
    const max = {
      x: Math.max(...rect.map(this.maxX)),
      y: Math.max(...rect.map(this.maxY))
    }
    return this.fromTwoPoints(min, max)
  }

  static intersection(rect1: RectType, rect2: RectType) {
    const x = Math.max(rect1.x, rect2.x)
    const x2 = Math.min(rect1.x + rect1.width, rect2.x + rect2.width)
    const y = Math.max(rect1.y, rect2.y)
    const y2 = Math.min(rect1.y + rect1.height, rect2.y + rect2.height)
    return { x, y, width: x2 - x, height: y2 - y }
  }

  /**
   * Returns all the corner points for a rect
   */
  static points(rect: RectType) {
    return [
      { x: this.minX(rect), y: this.minY(rect) },
      { x: this.minX(rect), y: this.maxY(rect) },
      { x: this.maxX(rect), y: this.minY(rect) },
      { x: this.maxX(rect), y: this.maxY(rect) }
    ]
  }

  /**
   * Checks if a rectangle contains a point
   */
  static containsPoint(rect, point) {
    if (point.x < this.minX(rect)) {
      return false
    }
    if (point.x > this.maxX(rect)) {
      return false
    }
    if (point.y < this.minY(rect)) {
      return false
    }
    if (point.y > this.maxY(rect)) {
      return false
    }
    if (isNaN(rect.x)) {
      return false
    }
    if (isNaN(rect.y)) {
      return false
    }
    return true
  }

  static intersects(rectA: RectType, rectB: RectType) {
    return !(
      rectB.x >= this.maxX(rectA) ||
      this.maxX(rectB) <= rectA.x ||
      rectB.y >= this.maxY(rectA) ||
      this.maxY(rectB) <= rectA.y
    )
  }

  // if the input rectangles are equal in size and position
  static equals(rect, other) {
    if (rect === other) return true
    if (!rect || !other) return false
    return rect.x === other.x && rect.y === other.y && rect.width === other.width && rect.height === other.height
  }
  static atOrigin(size) {
    return { ...size, x: 0, y: 0 }
  }

  static divide(rect, n) {
    return this.multiply(rect, 1 / n)
  }
  static offset(rect, delta) {
    const xOffset = typeof delta.x === 'number' ? delta.x : 0
    const yOffset = typeof delta.y === 'number' ? delta.y : 0
    return {
      ...rect,
      x: rect.x + xOffset,
      y: rect.y + yOffset
    }
  }
  static inflate(rect, value) {
    if (value === 0) return rect
    const doubleValue = 2 * value
    return {
      x: rect.x - value,
      y: rect.y - value,
      width: rect.width + doubleValue,
      height: rect.height + doubleValue
    }
  }
  static pixelAligned(rect) {
    const x = Math.round(rect.x)
    const y = Math.round(rect.y)
    const rectMaxX = Math.round(rect.x + rect.width)
    const rectMaxY = Math.round(rect.y + rect.height)
    const width = Math.max(rectMaxX - x, 0)
    const height = Math.max(rectMaxY - y, 0)
    return { x, y, width, height }
  }
  static halfPixelAligned(rect) {
    const x = Math.round(rect.x * 2) / 2
    const y = Math.round(rect.y * 2) / 2
    const rectMaxX = Math.round((rect.x + rect.width) * 2) / 2
    const rectMaxY = Math.round((rect.y + rect.height) * 2) / 2
    const width = Math.max(rectMaxX - x, 1)
    const height = Math.max(rectMaxY - y, 1)
    return { x, y, width, height }
  }
  static round(rect, decimals = 0) {
    const x = roundedNumber(rect.x, decimals)
    const y = roundedNumber(rect.y, decimals)
    const width = roundedNumber(rect.width, decimals)
    const height = roundedNumber(rect.height, decimals)
    return { x, y, width, height }
  }
  static roundToOutside(rect) {
    const x = Math.floor(rect.x)
    const y = Math.floor(rect.y)
    const rectMaxX = Math.ceil(rect.x + rect.width)
    const rectMaxY = Math.ceil(rect.y + rect.height)
    const width = Math.max(rectMaxX - x, 0)
    const height = Math.max(rectMaxY - y, 0)
    return { x, y, width, height }
  }

  static positions(rect) {
    return {
      minX: rect.x,
      midX: rect.x + rect.width / 2,
      maxX: this.maxX(rect),
      minY: rect.y,
      midY: rect.y + rect.height / 2,
      maxY: this.maxY(rect)
    }
  }
  static center(rect) {
    return {
      x: rect.x + rect.width / 2,
      y: rect.y + rect.height / 2
    }
  }
  static boundingRectFromPoints(ps) {
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    for (let i = 0; i < ps.length; i++) {
      const point = ps[i]
      minX = Math.min(minX, point.x)
      maxX = Math.max(maxX, point.x)
      minY = Math.min(minY, point.y)
      maxY = Math.max(maxY, point.y)
    }
    return { x: minX, y: minY, width: maxX - minX, height: maxY - minY }
  }
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
  static pointsAtOrigin(rect) {
    return [
      { x: 0, y: 0 },
      { x: rect.width, y: 0 },
      { x: rect.width, y: rect.height },
      { x: 0, y: rect.height }
    ]
  }
  /** Takes a rect and transforms it by a matrix, resulting in the bounding rectangle of the
   * rotated and/or translated original.
   */
  static transform(rect, matrix) {
    const { x: x1, y: y1 } = matrix.transformPoint({ x: rect.x, y: rect.y })
    const { x: x2, y: y2 } = matrix.transformPoint({
      x: rect.x + rect.width,
      y: rect.y
    })
    const { x: x3, y: y3 } = matrix.transformPoint({
      x: rect.x + rect.width,
      y: rect.y + rect.height
    })
    const { x: x4, y: y4 } = matrix.transformPoint({
      x: rect.x,
      y: rect.y + rect.height
    })
    const x = Math.min(x1, x2, x3, x4)
    const width = Math.max(x1, x2, x3, x4) - x
    const y = Math.min(y1, y2, y3, y4)
    const height = Math.max(y1, y2, y3, y4) - y
    return { x, y, width, height }
  }

  /**
   * Returns wether a rect contains another rect entirely
   */
  static containsRect(rectA, rectB) {
    for (const point of this.points(rectB)) {
      if (!this.containsPoint(rectA, point)) {
        return false
      }
    }
    return true
  }
  static toCSS(rect) {
    return {
      display: 'block',
      transform: `translate(${rect.x}px, ${rect.y}px)`,
      width: `${rect.width}px`,
      height: `${rect.height}px`
    }
  }
  static inset(rect, n) {
    return {
      x: rect.x + n,
      y: rect.y + n,
      width: Math.max(0, rect.width - 2 * n),
      height: Math.max(0, rect.height - 2 * n)
    }
  }
  static overlapHorizontally(rectA, rectB) {
    const aMax = this.maxX(rectA)
    const bMax = this.maxX(rectB)
    return aMax > rectB.x && bMax > rectA.x
  }
  static overlapVertically(rectA, rectB) {
    const aMax = this.maxY(rectA)
    const bMax = this.maxY(rectB)
    return aMax > rectB.y && bMax > rectA.y
  }
  static doesNotIntersect(rect, rects) {
    return (
      rects.find(comparingRect => {
        return this.intersects(comparingRect, rect)
      }) === undefined
    )
  }
  /**
   * @returns [tl, tr, br, bl]
   */
  static cornerPoints(rect) {
    const rectMinX = rect.x
    const rectMaxX = rect.x + rect.width
    const rectMinY = rect.y
    const rectMaxY = rect.y + rect.height
    const corner1 = { x: rectMinX, y: rectMinY }
    const corner2 = { x: rectMaxX, y: rectMinY }
    const corner3 = { x: rectMaxX, y: rectMaxY }
    const corner4 = { x: rectMinX, y: rectMaxY }
    return [corner1, corner2, corner3, corner4]
  }
  static midPoints(rect) {
    const rectMinX = rect.x
    const rectMidX = rect.x + rect.width / 2
    const rectMaxX = rect.x + rect.width
    const rectMinY = rect.y
    const rectMidY = rect.y + rect.height / 2
    const rectMaxY = rect.y + rect.height
    const top = { x: rectMidX, y: rectMinY }
    const right = { x: rectMaxX, y: rectMidY }
    const bottom = { x: rectMidX, y: rectMaxY }
    const left = { x: rectMinX, y: rectMidY }
    return [top, right, bottom, left]
  }
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
  static fromA(
    rect,
    defaults = {
      x: 0,
      y: 0,
      width: 0,
      height: 0
    }
  ) {
    return {
      x: rect.x || defaults.x,
      y: rect.y || defaults.y,
      width: rect.width || defaults.width,
      height: rect.height || defaults.height
    }
  }
  static delta(a, b) {
    const pointA = { x: this.minX(a), y: this.minY(a) }
    const pointB = { x: this.minX(b), y: this.minY(b) }
    return {
      x: pointA.x - pointB.x,
      y: pointA.y - pointB.y
    }
  }
  static withMinSize(rect, minSize) {
    const { width: minWidth, height: minHeight } = minSize
    const diffX = rect.width - minWidth
    const diffY = rect.height - minHeight
    return {
      width: Math.max(rect.width, minWidth),
      height: Math.max(rect.height, minHeight),
      x: rect.width < minWidth ? rect.x + diffX / 2 : rect.x,
      y: rect.height < minHeight ? rect.y + diffY / 2 : rect.y
    }
  }
  /**
   * Return false if any point is not inside or on the provided rect.
   */
  static anyPointsOutsideRect(rect, ps) {
    const rectMinX = this.minX(rect)
    const rectMinY = this.minY(rect)
    const rectMaxX = this.maxX(rect)
    const rectMaxY = this.maxY(rect)
    for (const point of ps) {
      if (point.x < rectMinX || point.x > rectMaxX) {
        return true
      }
      if (point.y < rectMinY || point.y > rectMaxY) {
        return true
      }
    }
    return false
  }
  // edges: (rect) => {
  //   const [tl, tr, br, bl] = Rect.cornerPoints(rect);
  //   return [Line(tl, tr), Line(tr, br), Line(br, bl), Line(bl, tl)];
  // },
  /**
   * Return a new rect projected into a new position based on the anchor rect and the given direction/alignment.
   */
  static rebaseRectOnto(rect, anchorRect, direction, alignment) {
    const rebasedRect = { ...rect }
    switch (direction) {
      case 'bottom':
      case 'top':
        switch (alignment) {
          case 'start':
            rebasedRect.x = anchorRect.x
            break
          case 'center':
            rebasedRect.x = anchorRect.x + anchorRect.width / 2 - rect.width / 2
            break
          case 'end':
            rebasedRect.x = anchorRect.x + anchorRect.width - rect.width
            break
          default:
          // assertNever(alignment);
        }
        break
      case 'left':
        rebasedRect.x = anchorRect.x - rect.width
        break
      case 'right':
        rebasedRect.x = anchorRect.x + anchorRect.width
        break
      default:
      // assertNever(direction);
    }
    switch (direction) {
      case 'left':
      case 'right':
        switch (alignment) {
          case 'start':
            rebasedRect.y = anchorRect.y
            break
          case 'center':
            rebasedRect.y = anchorRect.y + anchorRect.height / 2 - rect.height / 2
            break
          case 'end':
            rebasedRect.y = anchorRect.y + anchorRect.height - rect.height
            break
          default:
          // assertNever(alignment);
        }
        break
      case 'top':
        rebasedRect.y = anchorRect.y - rect.height
        break
      case 'bottom':
        rebasedRect.y = anchorRect.y + anchorRect.height
        break
      default:
      // assertNever(direction);
    }
    return rebasedRect
  }
}
