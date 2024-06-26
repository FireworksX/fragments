import { createState } from '@graph-state/core'
import Builder from '@/app/builder/widgets/Builder'
import loggerPlugin from '@graph-state/plugin-logger'
import extendPlugin from '@graph-state/plugin-extend'

export default function () {
  return <Builder></Builder>
}
