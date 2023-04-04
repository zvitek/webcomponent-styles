import { HTMLStencilElement } from '@stencil/core/internal';

export async function loadDesignSystemLibrary(target: HTMLStencilElement) {
  await Promise.all([
    //loadExternalScripts('https://newpvsstorage.z16.web.core.windows.net/cdn/0.0.12/build/core.js?v=2', false, target),
    loadExternalScripts('https://newpvsstorage.z16.web.core.windows.net/cdn/0.0.12/build/core.esm.js?v=2', true, target),
  ])
  //await loadExternalStyle('https://newpvsstorage.z16.web.core.windows.net/test/feedback/feedback.css?v=2', target)
  window['GOV_DS_CONFIG'] = {
    canValidateWcagOnRender: true,
    documentNode: target.shadowRoot
  }
}

export async function loadExternalScripts(scriptUrl: string, asModule: boolean = true, target: HTMLStencilElement) {
  let script = document.createElement('script');
  script.setAttribute('src', scriptUrl);
  if (asModule) {
    script.setAttribute('type', 'module');
  } else {
    script.noModule
  }
  if (target) {
    target.appendChild(script);
  }
  await script.onload;
}

export async function loadExternalStyle(styleUrl: string, target: HTMLStencilElement) {
  let style = document.createElement('style');
  style.setAttribute('href', styleUrl);
  if (target) {
    target.appendChild(style);
  }
  await style.onload;
}
