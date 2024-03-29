import { Config } from '@stencil/core';
import replace from 'rollup-plugin-replace';

export const config: Config = {
  namespace: 'mpsv-feedback',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
      strict: true,
    },
    {
      type: 'www',
      serviceWorker: null,
    },
    {
      type: 'dist-custom-elements',
      includeGlobalScripts: false,
    },
  ],
  plugins: [
    replace({
      API_URL: process.env.API_URL || '/dotazniky/rest',
      delimiters: ['{', '}'],
    }),
  ],
};
