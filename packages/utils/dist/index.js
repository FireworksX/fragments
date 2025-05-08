"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __pow = Math.pow;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  colorToObject: () => colorToObject,
  createConstants: () => createConstants,
  debounce: () => debounce,
  eventEmitter: () => eventEmitter,
  filterDeep: () => filterDeep,
  findDeep: () => findDeep,
  finiteNumber: () => finiteNumber,
  fromPx: () => fromPx,
  generateId: () => generateId,
  get: () => get,
  getKey: () => getKey,
  hashGenerator: () => hashGenerator,
  hexToRgb: () => hexToRgb,
  injectLink: () => injectLink,
  isAbsoluteUrl: () => isAbsoluteUrl,
  isBrowser: () => isBrowser_default,
  isEmptyValue: () => isEmptyValue,
  isFiniteNumber: () => isFiniteNumber,
  isHTMLNode: () => isHTMLNode,
  isKey: () => isKey,
  isObject: () => isObject,
  isPrimitive: () => isPrimitive,
  isValue: () => isValue,
  iterator: () => iterator,
  mergeIterator: () => mergeIterator,
  noop: () => noop,
  objectToColorString: () => objectToColorString,
  omit: () => omit,
  pick: () => pick,
  positiveValue: () => positiveValue,
  promiseWaiter: () => promiseWaiter,
  replace: () => replace,
  rgbStringToHex: () => rgbStringToHex,
  rgbToHex: () => rgbToHex,
  rgbToRgba: () => rgbToRgba,
  roundWithOffset: () => roundWithOffset,
  roundedNumber: () => roundedNumber,
  roundedNumberString: () => roundedNumberString,
  set: () => set,
  setKey: () => setKey,
  times: () => times,
  toKebabCase: () => toKebabCase,
  toLongHex: () => toLongHex,
  toPx: () => toPx
});
module.exports = __toCommonJS(src_exports);

// src/converts.ts
var fromPx = (val) => {
  if (typeof val === "string") {
    return Number(val.replace("px", ""));
  }
  return val || 0;
};
var toPx = (val) => typeof val === "string" || typeof val === "number" ? `${val}px` : "0px";

// src/isObject.ts
var isObject = (input) => {
  return typeof input === "object" && input !== null && !Array.isArray(input);
};

// src/isEmptyValue.ts
var isEmptyValue = (value) => !value && (value === null || value === void 0);

// src/isValue.ts
var isValue = (value) => !isEmptyValue(value);

// src/isAbsoluteUrl.ts
var isAbsoluteUrl = (input) => {
  return typeof input === "string" && !!input.includes && input.includes("://");
};

// src/isHTMLNode.ts
var isHTMLNode = (o) => {
  return typeof Node === "object" ? o instanceof Node : o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName === "string";
};

// src/promiseWaiter.ts
var promiseWaiter = (duration = 300, payload) => new Promise((resolve) => setTimeout(() => resolve(payload), duration));

// src/iterator.ts
var defaultFilterPredicate = () => true;
var defaultSkipPredicate = () => false;
var iterator = (input, visitor, basePath, options) => {
  const filterPredicate = (options == null ? void 0 : options.filterPredicate) || defaultFilterPredicate;
  const skipPredicate = (options == null ? void 0 : options.skipPredicate) || defaultSkipPredicate;
  if (skipPredicate(input))
    return input;
  if (Array.isArray(input)) {
    return input.map((el, index) => {
      const newPath = [basePath, index].filter(isValue).join(".");
      return iterator(visitor(index, el, newPath, options), visitor, newPath, options);
    }).filter(filterPredicate);
  }
  if (typeof input === "object" && input) {
    return Object.entries(input).reduce((acc, [key, value]) => {
      const newPath = [basePath, key].filter(isValue).join(".");
      const nextValue = iterator(visitor(key, value, newPath, options), visitor, newPath, options);
      if (filterPredicate(nextValue, key, input)) {
        acc[key] = nextValue;
      }
      return acc;
    }, {});
  }
  return input;
};

// src/eventEmitter.ts
var eventEmitter = () => {
  let listeners = {};
  const on = (event, callback) => {
    if (event in listeners) {
      listeners[event].push(callback);
    } else {
      listeners[event] = [callback];
    }
  };
  const emit = (event, ...args) => {
    if (event in listeners) {
      return listeners[event].map((cb) => cb(...args)).filter(Boolean);
    }
    return [];
  };
  const reset = () => listeners = {};
  const has = (event) => event in listeners;
  const get2 = (event) => listeners[event];
  return {
    on,
    has,
    get: get2,
    emit,
    reset
  };
};

// src/replace.ts
var replace = (text, variables) => {
  if (text && typeof text === "string" && variables) {
    const vars = Object.keys(variables);
    return vars.reduce((resultText, variable) => {
      const value = variables[variable];
      const formatVar = typeof value === "string" ? value.replace(/^\s|"/gi, "") : value;
      const regexp = new RegExp(`{${variable}}`, "g");
      return resultText.replace(regexp, formatVar != null ? formatVar : "");
    }, text);
  }
  return text;
};

// src/get.ts
var get = (obj, path, defValue) => {
  if (!path)
    return void 0;
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  const result = pathArray.reduce((prevObj, key) => prevObj && prevObj[key], obj);
  return result === void 0 ? defValue : result;
};

// src/set.ts
var set = (obj, path, value) => {
  const pathArray = Array.isArray(path) ? path : path.match(/([^[.\]])+/g);
  return pathArray.reduce((acc, key, i) => {
    if (acc[key] === void 0)
      acc[key] = {};
    if (i === pathArray.length - 1)
      acc[key] = value;
    return acc[key];
  }, obj);
};

// src/createConstants.ts
var createConstants = (...constants) => {
  return constants.reduce((acc, constant) => {
    acc[constant] = constant;
    return acc;
  }, {});
};

// src/isPrimitive.ts
var isPrimitive = (value) => typeof value !== "object" && typeof value !== "function" || value === null;

// src/toKebabCase.ts
var toKebabCase = (value) => value.replace(/[A-Z]+(?![a-z])|[A-Z]/g, ($, ofs) => (ofs ? "-" : "") + $.toLowerCase());

// src/toLongHex.ts
var toLongHex = (hex) => {
  const chars = hex.slice(1);
  if (chars.length === 3) {
    hex = "#" + chars.split("").map((val) => `${val}${val}`).join("");
  }
  return hex;
};

// src/rgbToHex.ts
var componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};
var rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};
var rgbStringToHex = (rgb) => {
  var _a;
  const match = (_a = rgb == null ? void 0 : rgb.match) == null ? void 0 : _a.call(
    rgb,
    /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/
  );
  const r = Number(match == null ? void 0 : match[1]);
  const g = Number(match == null ? void 0 : match[2]);
  const b = Number(match == null ? void 0 : match[3]);
  return isNaN(r) ? rgb : rgbToHex(r, g, b);
};

// src/hexToRgb.ts
var hexToRgb = (hex) => {
  const longHex = toLongHex(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(longHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : void 0;
};

// src/rgbToRgba.ts
var rgbToRgba = (rgb, alpha = 1) => rgb.replace(")", `, ${alpha})`).replace("rgb", "rgba");

// src/mergeIterator.ts
var mergeIterator = (target, input, customFilter) => iterator(target, (key, value, path) => {
  if (isPrimitive(value) || Array.isArray(value) && value.every(isPrimitive)) {
    if (customFilter) {
      if (customFilter(key, [value, get(input, path)], path)) {
        return get(input, path, value);
      } else {
        return value;
      }
    }
    return get(input, path, value);
  }
  return value;
});

// src/noop.ts
var noop = () => void 0;

// src/filterDeep.ts
var filterDeep = (input, predicate) => {
  const result = [];
  iterator(input, (key, value, path) => {
    if (predicate(key, value, path, result)) {
      result.push({ key, value, path });
    }
    return value;
  });
  return result;
};

// src/findDeep.ts
var findDeep = (input, predicate) => {
  try {
    iterator(input, (key, value, path) => {
      if (predicate(key, value, path)) {
        throw { key, value, path };
      }
      return value;
    });
  } catch (findValue) {
    return findValue;
  }
};

// src/pick.ts
var pick = (obj, ...props) => {
  return props.reduce((result, prop) => {
    result[prop] = obj[prop];
    return result;
  }, {});
};

// src/omit.ts
function omit(obj, ...props) {
  const result = __spreadValues({}, obj);
  props.forEach((prop) => {
    delete result[prop];
  });
  return result;
}

// src/times.ts
var times = (amount = 1) => new Array(amount).fill(null).map((_, i) => i);

// src/injectLink.ts
var injectLink = (options) => {
  const head = document.getElementsByTagName("head")[0];
  const link = document.createElement("link");
  Object.entries(options).forEach(([key, value]) => link.setAttribute(key, value));
  head.appendChild(link);
};

// src/debounce.ts
function debounce(func, wait, immediate = false) {
  let timeoutId = null;
  let lastArgs = null;
  let lastThis;
  let result;
  let lastCallTime = null;
  const later = () => {
    const timeSinceLastCall = Date.now() - (lastCallTime || 0);
    if (timeSinceLastCall < wait && timeSinceLastCall >= 0) {
      timeoutId = setTimeout(later, wait - timeSinceLastCall);
    } else {
      if (!immediate) {
        result = func.apply(lastThis, lastArgs);
      }
      timeoutId = null;
      lastArgs = null;
      lastThis = null;
    }
  };
  const debounced = function(...args) {
    lastCallTime = Date.now();
    lastArgs = args;
    lastThis = this;
    const callNow = immediate && !timeoutId;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(lastThis, lastArgs);
    }
    return result;
  };
  debounced.cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = null;
    lastArgs = null;
    lastThis = null;
  };
  debounced.flush = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      timeoutId = null;
      const res = func.apply(lastThis, lastArgs);
      lastArgs = null;
      lastThis = null;
      return res;
    }
    return result;
  };
  return debounced;
}

// src/isBrowser.ts
var isBrowser_default = typeof window !== "undefined";

// src/generateId.ts
var generateId = () => Math.random().toString(16).slice(2);

// src/colors/getRgbFromColor.ts
var getRgbFromColor = (color) => {
  var _a;
  if (!color)
    return null;
  if (typeof color === "string" && color.startsWith("#")) {
    return hexToRgb(color) || null;
  }
  if (typeof color === "string") {
    const [r, g, b, a] = (_a = color.match(/\d+/g)) != null ? _a : [];
    if (!r) {
      return null;
    }
    return {
      r: +r,
      g: +g,
      b: +b,
      a: +a
    };
  }
  return color;
};

// src/colors/colorToObject.ts
var colorToObject = (color) => {
  if (!color)
    return null;
  const isHex = typeof color === "string" && color.startsWith("#");
  if (isHex) {
    const rgbColor = hexToRgb(color);
    if (!rgbColor)
      return null;
    return {
      r: rgbColor.r,
      g: rgbColor.g,
      b: rgbColor.b
    };
  }
  if (typeof color === "string") {
    return getRgbFromColor(color);
  }
  if (["r", "g", "b"].every((v) => v in color)) {
    return color;
  }
  return null;
};

// src/colors/objectToColorString.ts
var objectToColorString = (color) => {
  if (!color || !isObject(color))
    return color;
  const resR = Number(color.r);
  const resG = Number(color.g);
  const resB = Number(color.b);
  const resA = Number(color.a);
  if ([resR, resG, resB].every(isFinite)) {
    if (resA < 1) {
      return `rgba(${resR}, ${resG}, ${resB}, ${resA})`;
    }
    return `rgb(${resR}, ${resG}, ${resB})`;
  }
  return color;
};

// src/finiiteNumber.ts
function isFiniteNumber(value) {
  return typeof value === "number" && isFinite(value);
}
function finiteNumber(value) {
  return isFiniteNumber(value) ? value : void 0;
}
function positiveValue(value) {
  if (isFiniteNumber(value) && value > 0) {
    return value;
  }
  return 0;
}

// src/keys.ts
var setKey = (v) => `$${v}`;
var getKey = (v) => isKey(v) ? v.slice(1) : null;
var isKey = (v) => typeof v === "string" && v.startsWith("$");

// src/hashGenerator.ts
function hashGenerator(layerKey) {
  let hash = 0;
  for (let i = 0; i < layerKey.length; i++) {
    hash = (hash << 5) - hash + layerKey.charCodeAt(i);
    hash |= 0;
  }
  const raw = Math.abs(hash).toString(36);
  return /^[0-9]/.test(raw) ? `h${raw}` : raw;
}

// src/roundedNumber.ts
function roundedNumber(value, decimals = 0) {
  const d = Math.round(Math.abs(decimals));
  const multiplier = __pow(10, d);
  return Math.round(value * multiplier) / multiplier;
}
function roundedNumberString(value, decimals = 0) {
  const result = value.toFixed(decimals);
  return decimals === 0 ? result : `${+result}`;
}
function roundWithOffset(value, offset) {
  if (offset === 0) {
    return Math.round(value);
  }
  offset -= offset | 0;
  if (offset < 0) {
    offset = 1 - offset;
  }
  return Math.round(value - offset) + offset;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  colorToObject,
  createConstants,
  debounce,
  eventEmitter,
  filterDeep,
  findDeep,
  finiteNumber,
  fromPx,
  generateId,
  get,
  getKey,
  hashGenerator,
  hexToRgb,
  injectLink,
  isAbsoluteUrl,
  isBrowser,
  isEmptyValue,
  isFiniteNumber,
  isHTMLNode,
  isKey,
  isObject,
  isPrimitive,
  isValue,
  iterator,
  mergeIterator,
  noop,
  objectToColorString,
  omit,
  pick,
  positiveValue,
  promiseWaiter,
  replace,
  rgbStringToHex,
  rgbToHex,
  rgbToRgba,
  roundWithOffset,
  roundedNumber,
  roundedNumberString,
  set,
  setKey,
  times,
  toKebabCase,
  toLongHex,
  toPx
});
//# sourceMappingURL=index.js.map