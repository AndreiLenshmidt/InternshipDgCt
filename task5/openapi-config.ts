import type { ConfigFile } from '@rtk-query/codegen-openapi'

/**
 * @link {https://redux-toolkit.js.org/rtk-query/usage/code-generation}
 */
const config: ConfigFile = {
   schemaFile: 'https://trainee-academy.devds.ru/swagger/openapi.json',
   apiFile: './src/api/index.ts',
   apiImport: 'baseSplitApi',
   outputFile: './src/store/api.types.ts',
   exportName: 'kanban',
   hooks: true,
}

export default config