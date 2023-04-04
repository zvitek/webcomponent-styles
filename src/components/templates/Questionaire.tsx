import { h } from '@stencil/core';
import { Dotaznik } from '../../schema/generated/types';

export const questionnaireTemplates = (questionnaire: Dotaznik) => {
  return {
    description: () => {
      if (String(questionnaire.popis).length === 0 || !questionnaire.popis) {
        return null;
      }
      return (
        <div>
          <p>{questionnaire.popis}</p>
          <gov-spacer size={'xl'}></gov-spacer>
        </div>
      );
    },
  };
};
