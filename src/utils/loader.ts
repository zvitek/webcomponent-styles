import { HTMLStencilElement } from '@stencil/core/internal';

export async function loadDesignSystemLibrary(target: HTMLStencilElement) {
  await loadExternalScripts('https://newpvsstorage.z16.web.core.windows.net/cdn/0.0.10/build/core.esm.js?v=2', true, target);
  //await loadExternalScripts('https://newpvsstorage.z16.web.core.windows.net/cdn/0.0.10/build/core.js?v=2', false, target)
}

export async function loadExternalScripts(scriptUrl: string, asModule: boolean = true, target: HTMLStencilElement) {
  let script = document.createElement('script');
  script.setAttribute('src', scriptUrl);
  if (asModule) {
    script.setAttribute('type', 'module');
  }
  if (target) {
    target.appendChild(script);
  }
  await script.onload;
}
