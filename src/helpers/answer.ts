import { Dotaznik, OdpovedDotazniku, OtazkaDotazniku, ZaznamDotazniku } from '../schema/generated/types';
import { Answer, AnswerError } from '../schema/Answer';
import { isAdditionalAnswerAvailable } from './question';

export function isQuestionAnswered(question: OtazkaDotazniku, clientAnswers: Answer[]): Answer {
  return clientAnswers.find((answer) => answer.questionId === question.id) || null;
}

export function validateClientAnswers(questions: OtazkaDotazniku[], answers: Answer[]): AnswerError[] {
  return questions.map((question) => {
    if (question.povinnostOdpovedi === false) {
      return null;
    }
    const answer = isQuestionAnswered(question, answers);
    const isAdditionalAnswer = isAdditionalAnswerAvailable(question);
    if (answer === null) {
      return {
        questionId: question.id,
        message: 'Tato otázka je povinná',
      };
    } else if (isAdditionalAnswer && String(answer.additionalValue).length > 0) {
      return null;
    } else if (question.viceOdpovedi && (Array.isArray(answer.value) && answer.value.length === 0)) {
      return {
        questionId: question.id,
        message: 'Vyberte alespoň jednu odpověď',
      };
    } else if (question.viceOdpovedi === false && String(answer.value).length === 0) {
      return {
        questionId: question.id,
        message: 'Zadejte, prosím, odpověď',
      };
    }
    return null;
  }).filter((errors) => errors !== null);
}

export function prepareAnswersForSubmit(questionnaire: Dotaznik, answers: Answer[]): ZaznamDotazniku {
  const date = new Date()
  const clearAnswers: OdpovedDotazniku[] = [];
  answers.map((answer) => {
    if (Array.isArray(answer.value)) {
      answer.value.map((value) => {
        clearAnswers.push({
          otazkaId: answer.questionId,
          textOdpovedi: String(value),
        });
      });
    } else {
      clearAnswers.push({
        doplnujiciOdpoved: answer.additionalValue,
        otazkaId: answer.questionId,
        textOdpovedi: String(answer.value),
      });
    }
  });
  let body: ZaznamDotazniku = {
    casVolani: date.toISOString(),
    casVyplneni: date.toISOString(),
    dotaznikId: questionnaire.id,
    token: '',
    odpovedDotazniku: clearAnswers,
  };

  return body;
}
