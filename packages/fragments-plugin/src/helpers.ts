import { GraphState, Entity, Graph } from '@graph-state/core'

export const generateId = () => Math.random().toString(16).slice(2)

export const setKey = (key: string) => `$${key}`
export const getKey = (key: string) => (typeof key === 'string' && key.startsWith('$') ? key.slice(1) : key)

export type Resolver = (graphState: GraphState, entity: Entity) => any

export type ResolverNode = (graphState: GraphState, graph: Graph) => Graph

export const pipeResolvers =
  (...resolvers: Resolver[]) =>
  (graph: Graph, graphState: GraphState) => {
    return resolvers.reduceRight((acc, resolver) => {
      return resolver(graphState, acc)
    }, graph)
  }

export const OVERRIDE = 'override'

export const clonedField = (graphState: GraphState, entity: Entity, key: string, fallback?: unknown = null) =>
  graphState.hasOverride(entity, key) ? OVERRIDE : entity[key] ?? fallback
