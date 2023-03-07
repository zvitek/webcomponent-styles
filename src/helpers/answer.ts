import { OtazkaDotazniku } from '../schema/generated/types';
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
    return null
  }).filter((errors) => errors !== null);
}
