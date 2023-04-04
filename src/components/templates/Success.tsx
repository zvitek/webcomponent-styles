import { h } from '@stencil/core';

export const successTemplate = (closeButton: boolean = false) => {
  return (
    <div class={'mpsv-form__success'}>
      <gov-empty>
        <gov-icon slot='icon' name='doc-review' type='complex'></gov-icon>
        <p class='gov-text--4xl gov-color--success-500 gov-mb--unset'>Odesláno</p>
        <p class='gov-text--l gov-color--secondary-700'>
          Děkujeme za odeslaní zpětná vazby.
        </p>
        <gov-spacer size={'l'}></gov-spacer>
        {closeButton ? (
          <gov-button variant={'primary'} type={'outlined'} wcag-label={'Zavřít okno dotazníku'}>Zavřít</gov-button>
        ) : null}
      </gov-empty>
    </div>
  );
};
