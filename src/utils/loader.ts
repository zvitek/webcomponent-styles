import { HTMLStencilElement } from '@stencil/core/internal';

export async function loadDesignSystemLibrary(target: HTMLStencilElement) {
  await loadExternalScripts('https://newpvsstorage.z16.web.core.windows.net/cdn/0.0.1/build/core.esm.js', true, target);
  setTimeout(() => loadExternalScripts('https://newpvsstorage.z16.web.core.windows.net/cdn/0.0.1/build/core.js', false, target), 500)
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
