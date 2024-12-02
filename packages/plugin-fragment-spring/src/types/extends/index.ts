import { EntityKey } from "@/types/props.ts";

export interface BaseProps {
  name: string | null;
  getParents(): ReadonlyArray<BaseProps[]> | null;
  getParent(): BaseProps | null;
  toString(): string;
  remove(): void;
  getAllParents(): ReadonlyArray<BaseProps[]> | null;
  toStringState(): string;
  rename(name: string): void;
  duplicate(): void;
}

export interface CloneProps {
  overrides: ReadonlyArray<EntityKey>;
  clone(): string;
}
