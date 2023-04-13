import { Dotaznik } from '../schema/generated/types';


export function isQuestionnaireClosed(questionnaire: Dotaznik): boolean {
  if (questionnaire.datumDo) {
    const now = new Date();
    const date = new Date(questionnaire.datumDo);
    date.setHours(23, 59, 59);
    now.setHours(23, 59, 59);

    return now.getTime() > date.getTime();
  }

  return false;
}
