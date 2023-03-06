export interface Answer {
  questionId: number;
  value: string | number | number[] | string[];
  additionalValue: string | undefined;
}

export interface AnswerError {
  questionId: number;
  message: string | undefined;
}
