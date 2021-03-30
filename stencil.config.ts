import { Config } from '@stencil/core';
import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';

// const EVENTS = {
//   "Select": "duetSelect",
//   "Change": "duetChange"
// };
// const ATTRS = {
//   "Checked": "checked",
//   "Value": "value"
// };
// const angularValueAccessorBindings: ValueAccessorConfig[] = [
//   {
//     elementSelectors: ["duet-checkbox", "duet-toggle"],
//     event: EVENTS.Change,
//     targetAttr: ATTRS.Checked,
//     type: "boolean"
//   },
//   {
//     elementSelectors: ["duet-input[type=number]"],
//     event: EVENTS.Change,
//     targetAttr: ATTRS.Value,
//     type: "number"
//   },
//   {
//     elementSelectors: ["duet-radio"],
//     event: EVENTS.Select,
//     targetAttr: ATTRS.Checked,
//     type: "radio"
//   },
//   {
//     elementSelectors: ["duet-range-slider", "duet-select", "duet-radio-group"],
//     event: EVENTS.Change,
//     targetAttr: ATTRS.Value,
//     type: "select"
//   },
//   {
//     elementSelectors: ["duet-input:not([type=number])", "duet-textarea"],
//     event: EVENTS.Change,
//     targetAttr: ATTRS.Value,
//     type: "text"
//   }
// ];

// export const config: Config = {
//   namespace: 'component-set',
//   outputTargets: [
//     angularOutputTarget({
//       componentCorePackage: 'components-set',
//       directivesProxyFile: '../component-library-angular/src/directives/proxies.ts',
//       valueAccessorConfigs: angularValueAccessorBindings,
//     }),
//     {
//       type: 'dist',
//       esmLoaderPath: '../loader'
//     },
//     {
//       type: 'dist-custom-elements-bundle',
//     },
//     {
//       type: 'docs-readme',
//     },
//     {
//       type: 'www',
//       serviceWorker: null, // disable service workers
//     },
//   ]
// }

export const config: Config = {
  namespace: 'components-set',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements-bundle',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
};
