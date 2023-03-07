import { OtazkaDotazniku } from '../schema/generated/types';
import { AnswerControl } from '../schema/Answer';

export function isActiveAdditionalAnswer(question: OtazkaDotazniku, controls: AnswerControl[]): boolean {
  const control = controls.find((control) => control.questionId === question.id) || null;
  if (control) {
    return control.additional;
  }
  return false;
}
