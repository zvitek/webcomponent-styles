# mpsv-feedback



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute      | Description                           | Type                      | Default        |
| -------------- | -------------- | ------------------------------------- | ------------------------- | -------------- |
| `code`         | `code`         | Unique questionnaire code             | `string`                  | `undefined`    |
| `presentation` | `presentation` | Variant of questionnaire presentation | `"modal" \| "standalone"` | `'standalone'` |
| `token`        | `token`        | Unique user code                      | `string`                  | `undefined`    |


## Events

| Event             | Description                                                             | Type                    |
| ----------------- | ----------------------------------------------------------------------- | ----------------------- |
| `mpsv-close`      | Called when the questionnaire is closed. Only in the case of a dialogue | `CustomEvent<any>`      |
| `mpsv-load-error` | Called when questionnaire loading error                                 | `CustomEvent<Error>`    |
| `mpsv-loaded`     | Called after successful loading of the questionnaire                    | `CustomEvent<Dotaznik>` |
| `mpsv-sent`       | Called after successful questionnaire submission                        | `CustomEvent<Dotaznik>` |
| `mpsv-sent-error` | Called in case of a questionnaire submission error                      | `CustomEvent<Dotaznik>` |


## Methods

### `closeModal() => Promise<void>`

Closes the open questionnaire. (Only in case of modal)

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
