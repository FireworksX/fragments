import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: `${process.env.BACKEND_ENDPOINT}/graphql`,
  documents: ['src/**/*.gql'],
  generates: {
    src: {
      preset: 'near-operation-file',
      presetConfig: {
        extension: '.generated.ts',
        baseTypesPath: '/__generated__/types.ts'
      },
      plugins: ['typescript-operations', 'typescript-react-apollo']
    },
    'src/__generated__/types.ts': {
      plugins: ['typescript']
    }
  },
  ignoreNoDocuments: true
}

export default config
