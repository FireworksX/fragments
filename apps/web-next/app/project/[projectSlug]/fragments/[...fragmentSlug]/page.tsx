import { FragmentBuilder } from '@/views/FragmentBuilder'
import { FragmentPreview } from '@/views/FragmentPreview'
import { FragmentDetail } from '@/views/FragmentDetail'

export default () => <FragmentDetail builder={<FragmentBuilder />} preview={<FragmentPreview />} />
