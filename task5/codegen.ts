import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
   // ...
   generates: {
      'path/to/file.ts': {
         plugins: ['typescript', 'typescript-resolvers', 'typescript-rtk-query'],
         config: {
            importBaseApiFrom: 'src/app/api/baseApi',
         },
      },
   },
};
export default config;