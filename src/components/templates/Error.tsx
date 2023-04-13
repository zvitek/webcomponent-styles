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

export const mainErrorTemplate = () => {
  return (
    <div class={'mpsv-form__error'}>
      <gov-spacer size={'l'}></gov-spacer>
      <gov-empty>
        <gov-icon slot='icon' name='card-404' type='complex'></gov-icon>
        <p class='gov-text--4xl gov-mb--unset'>Dotazník nenalezen</p>
        <p class='gov-text--l gov-color--secondary-700 gov-mb--unset'>
          Je nám líto, ale požadovaný dotazník nebyl nalezen.
        </p>
      </gov-empty>
    </div>
  );
};

export const infoErrorTemplate = () => {
  return (
    <div class={'mpsv-form__info'}>
      <gov-spacer size={'l'}></gov-spacer>
      <gov-empty>
        <gov-icon slot='icon' name='confusion' type='complex'></gov-icon>
        <p class='gov-text--4xl gov-mb--unset'>Dotazník ukončen</p>
        <p class='gov-text--l gov-color--secondary-700 gov-mb--unset'>
          Litujeme, dotazník byl již ukončen.
        </p>
      </gov-empty>
    </div>
  );
};
