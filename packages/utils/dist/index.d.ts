declare const fromPx: (val?: string | number) => number;
declare const toPx: (val?: string | number) => string;

declare const isObject: (input: unknown) => input is Record<string, unknown>;

declare const isValue: <T>(value: T) => value is Exclude<T, null | undefined>;

declare const isEmptyValue: (value: unknown) => value is null | undefined;

declare const isAbsoluteUrl: (input: any) => boolean;

declare const isHTMLNode: (o: any) => any;

declare const promiseWaiter: <T = unknown>(duration?: number, payload?: T | undefined) => Promise<unknown>;

type Visitor<TReturn = unknown, TValue = unknown> = (key: PropertyKey, value: TValue, path: string, options?: IteratorOptions) => TReturn;
type FilterIteratorPredicate = (nextValue: unknown, key: string | number, input: unknown) => boolean;
type SkipIteratorPredicate = (value: unknown) => boolean;
interface IteratorOptions {
    filterPredicate?: FilterIteratorPredicate;
    skipPredicate?: SkipIteratorPredicate;
    metaInfo?: Record<PropertyKey, any>;
}
declare const iterator: <TVisitor extends Visitor<unknown, unknown>>(input: unknown, visitor: TVisitor, basePath?: string, options?: IteratorOptions) => any;

interface EventEmitter<TEvents extends AnyEvents = AnyEvents> {
    on<TKey extends keyof TEvents>(event: TKey, callback: TEvents[TKey]): ReturnType<TEvents[TKey]>;
    /**
     * Метод emit() принимает event который нужно вызвать + параметры
     * Возвращает массив того что вернули подписчики
     */
    emit<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>): ReturnType<TEvents[TKey]>[];
    has<TKey extends keyof TEvents>(event: TKey): boolean;
    get<TKey extends keyof TEvents>(event: TKey): unknown;
    reset(): void;
}
type AnyEvents = Record<any, () => any>;
declare const eventEmitter: <TEvents extends AnyEvents = AnyEvents>() => EventEmitter<TEvents>;

type AnyObject<T = any> = Record<string, T>;

declare const replace: (text: string, variables?: AnyObject) => string;

declare const get: (obj: AnyObject, path: string, defValue?: unknown) => any;

declare const set: (obj: AnyObject, path: string, value: unknown) => AnyObject<any>;

declare const createConstants: <K extends string>(...constants: K[]) => { [P in K]: P; };

declare const isPrimitive: (value: unknown) => boolean;

declare const toKebabCase: (value: string) => string;

/**
 * #f0f -> #ff00ff
 */
declare const toLongHex: (hex: string) => string;

declare const rgbToHex: (r: number, g: number, b: number) => string;
declare const rgbStringToHex: (rgb: string) => string;

declare const hexToRgb: (hex: string) => {
    r: number;
    g: number;
    b: number;
} | undefined;

declare const rgbToRgba: (rgb: string, alpha?: number) => string;

/**
 *
 * @param target - Объект, который будет заполняться
 * @param input - Данные, которыми будет заполняться target
 * @param customFilter - Кастомный Фильтр, если возвращает true - данные заменяются, иначе нет
 */
declare const mergeIterator: (target: AnyObject, input: AnyObject, customFilter?: Visitor<boolean, [
    unknown,
    unknown
]>) => any;

declare const noop: () => undefined;

declare const filterDeep: (input: unknown[] | AnyObject, predicate: (key: PropertyKey, value: unknown, path: string, resultArray: unknown[]) => boolean) => unknown[];

declare const findDeep: (input: unknown[] | AnyObject, predicate: (key: PropertyKey, value: unknown, path: string) => boolean) => unknown | undefined;

declare const pick: <TValue extends AnyObject<any>>(obj: TValue, ...props: (keyof TValue)[]) => any;

declare function omit<T extends AnyObject, P extends string[]>(obj: T, ...props: P): Omit<T, P[number]>;

declare const times: (amount?: number) => number[];

declare const cleanGraph: (input: unknown) => unknown;

interface InjectLinkOptions {
    rel: string;
    href: string;
}
declare const injectLink: (options: InjectLinkOptions) => void;

type DebouncedFunction<T extends (...args: any[]) => any> = {
    (...args: Parameters<T>): ReturnType<T> | undefined;
    cancel: () => void;
    flush: () => ReturnType<T> | undefined;
};
declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number, immediate?: boolean): DebouncedFunction<T>;

declare const _default: boolean;

declare const generateId: () => string;

interface OutputColor {
    r: number;
    g: number;
    b: number;
    a?: number;
}
declare const colorToObject: (color: string | OutputColor) => OutputColor | null;

interface Color {
    r: number;
    g: number;
    b: number;
    a?: number;
}
declare const objectToColorString: <T extends Color>(color: T) => string | T;

declare function isFiniteNumber(value: unknown): value is number;
declare function finiteNumber(value: unknown): number | undefined;
declare function positiveValue<T = unknown>(value: T): number;

declare const setKey: (v: string) => string;
declare const getKey: (v: string) => string | null;
declare const isKey: (v: string) => boolean;

declare function hashGenerator(layerKey: string): string;

declare function roundedNumber(value: number, decimals?: number): number;
declare function roundedNumberString(value: number, decimals?: number): string;
declare function roundWithOffset(value: number, offset: number): number;

export { cleanGraph, colorToObject, createConstants, debounce, eventEmitter, filterDeep, findDeep, finiteNumber, fromPx, generateId, get, getKey, hashGenerator, hexToRgb, injectLink, isAbsoluteUrl, _default as isBrowser, isEmptyValue, isFiniteNumber, isHTMLNode, isKey, isObject, isPrimitive, isValue, iterator, mergeIterator, noop, objectToColorString, omit, pick, positiveValue, promiseWaiter, replace, rgbStringToHex, rgbToHex, rgbToRgba, roundWithOffset, roundedNumber, roundedNumberString, set, setKey, times, toKebabCase, toLongHex, toPx };
