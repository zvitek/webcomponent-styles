# Examples of use

## Loading the library

If we need to display the component immediately, we recommend to find it in the `header`.
Otherwise, we load the points at the end of `body`.

```html
<script type='module' src='https://newpvsstorage.z16.web.core.windows.net/test/feedback/mpsv-feedback.esm.js'></script>
```

## Component initialization

### HTML
The component can be initialized purely in `html`

```html
<mpsv-feedback id="feedback-instance" presentation='modal' code='AVD' token='user-super-token'></mpsv-feedback>
```

### Script
Or you can create it with a `script`

```javascript
const feedback = document.createElement('mpsv-feedback');
feedback.setAttribute('id', 'feedback-instance');
feedback.setAttribute('presentation', 'modal');
feedback.setAttribute('code', 'AVD')
feedback.setAttribute('token', 'user-super-token');

document.body.append(feedback);
```

### Documentation
> Documentation of the component parameters is available on [gitlab/MPSV_IKR](https://gitlab/MPSV_IKR/frontend/dotazniky-client/-/blob/develop/src/components/feedback/readme.md)

## Component display

By default, the component is not displayed

### Attribute `display`

The component is displayed after receiving the `display` attribute.
This attribute can be added directly when initializing the component, or later, as needed

```html
<mpsv-feedback ... display></mpsv-feedback>
```

```javascript
const feedback = document.createElement('mpsv-feedback');
// ...
feedback.setAttribute('display', 'true');
// ...
document.body.append(feedback);
```