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
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  plugins: [
    replace({
      API_URL: process.env.API_URL || "https://mpsv-ivp-lb.assecosk.local/dotazniky/rest",
      delimiters: ['{', '}'],
    })
  ]
};
