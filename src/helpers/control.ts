import { Dotaznik, OtazkaDotazniku } from '../schema/generated/types';
import { AnswerControl } from '../schema/Answer';
import { createHash } from '../utils/random';

const storageKey = 'mpsv-questionnaires';

export function isActiveAdditionalAnswer(question: OtazkaDotazniku, controls: AnswerControl[]): boolean {
  const control = controls.find((control) => control.questionId === question.id) || null;
  if (control) {
    return control.additional;
  }
  return false;
}

/**
 * HASH CONTROLS
 */

export function createCustomerIdForQuestionnaire(questionnaire: Dotaznik): number {
  const code = 'questionnaire-' + questionnaire.id;
  return createHash(code);
}

export function getListOfFilledQuestionnaires(): number[] {
  const list = localStorage.getItem(storageKey);
  if (typeof list === 'string' && list.length) {
    return JSON.parse(list);
  } else {
    return [];
  }
}

export function isQuestionnaireFilled(hash: number): boolean {
  return getListOfFilledQuestionnaires().indexOf(hash) !== -1;
}

export function addToFilledQuestionnaires(hash: number): void {
  if (isQuestionnaireFilled(hash) === false) {
    const list = getListOfFilledQuestionnaires();
    list.push(hash);
    localStorage.setItem(storageKey, JSON.stringify(list));
  }
}
