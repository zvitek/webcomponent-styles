import { OtazkaDotazniku } from '../schema/generated/types';

export function isAdditionalAnswerAvailable(question: OtazkaDotazniku): boolean {
  return !!(question.moznostOdpovedi.length > 1 && question.moznostOdpovedi.find((answer) => answer.typ === 'OTEVRENA'));
}

export function isTextAvailable(question: OtazkaDotazniku): boolean {
  return !!(question.moznostOdpovedi.length === 1 && question.moznostOdpovedi.find((answer) => answer.typ === 'OTEVRENA'));
}

export function isRangeAvailable(question: OtazkaDotazniku): boolean {
  return !!question.moznostOdpovedi.find((answer) => answer.typ === 'SKALA');
}
