import { h } from '@stencil/core';

export const errorTemplate = () => {
  return (
    <gov-message variant='error'>
      <gov-icon name='info' slot='icon'></gov-icon>
      <p class={'gov-color--error-500'}>
        Formulář se nepodařilo odeslat, zkuste to, prosím, znovu anebo nás kontaktujte.
      </p>
    </gov-message>
  );
};
