import { h } from '@stencil/core';

export const errorTemplate = () => {
  return (
    <div>
      <gov-message variant='error'>
        <gov-icon name='info' slot='icon'></gov-icon>
        <p class={'gov-color--error-500'}>
          Formulář se nepodařilo odeslat, zkuste to, prosím, znovu anebo nás kontaktujte.
        </p>
      </gov-message>
      <gov-spacer size={'l'}></gov-spacer>
    </div>
  );
};
