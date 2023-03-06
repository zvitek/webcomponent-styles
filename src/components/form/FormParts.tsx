import { h } from '@stencil/core';
import { OtazkaDotazniku } from '../../schema/generated/types';
import { Answer, AnswerError } from '../../schema/Answer';

export interface FormPartProps {
  onAnswerUpdate: (answer: Answer) => void;
  answers: Answer[];
  errors: AnswerError[];
}

export const formInputGenerator = (question: OtazkaDotazniku, props: FormPartProps) => {
  const error = computeError(question, props);
  const numberOfOptions = question.moznostOdpovedi.length;
  let component;
  if (question.viceOdpovedi) {
    component = formClassicCheckboxList(question, props);
  } else {
    component = formClassicRadioList(question, props);
  }
  if (numberOfOptions === 1) {
    component = formClassicInput(question, props);
  }

  return (
    <gov-form-control invalid={error ? true : false}>
      <gov-form-label size='xl' slot='top'>{question.popisOtazky}</gov-form-label>
      <gov-form-group>
        {component}
      </gov-form-group>
      {renderMessage(question)}
      {error}
    </gov-form-control>
  );
};

const formClassicRadioList = (question: OtazkaDotazniku, props: FormPartProps) => {
  const onChange = (e: CustomEvent) => {
    const target = e;
    props.onAnswerUpdate({
      questionId: question.id,
      value: target.detail.value,
      additionalValue: undefined,
    });
  };
  const options = question.moznostOdpovedi.filter((answer) => answer.typ === false);
  return options.map((option) => {
    return (
      <gov-form-radio name={question.id} value={option.id} on-gov-change={onChange}>
        <gov-form-label slot='label'>{option.zneniOdpovedi}</gov-form-label>
      </gov-form-radio>
    );
  });
};


const formClassicCheckboxList = (question: OtazkaDotazniku, props: FormPartProps) => {
  const onChange = (e: CustomEvent) => {
    const answer = props.answers.find((answer) => answer.questionId === question.id) || null;
    let selected = answer ? answer.value as string[] : [];
    const target = e;
    const index = selected.findIndex((id) => id === target.detail.value);
    if (index > -1) {
      selected.splice(index, 1);
    }
    if (target.detail.checked) {
      selected.push(target.detail.value);
    }
    props.onAnswerUpdate({
      questionId: question.id,
      value: selected,
      additionalValue: undefined,
    });
  };
  const options = question.moznostOdpovedi.filter((answer) => answer.typ === false);
  return (
    options.map((option) => {
      return (
        <gov-form-checkbox name={question.id + option.id} value={option.id} on-gov-change={onChange}>
          <gov-form-label slot='label'>{option.zneniOdpovedi}</gov-form-label>
        </gov-form-checkbox>
      );
    })
  );
};

const formClassicInput = (question: OtazkaDotazniku, props: FormPartProps) => {
  const onChange = (e: CustomEvent) => {
    const target = e.target as HTMLInputElement;
    props.onAnswerUpdate({
      questionId: question.id,
      value: target.value,
      additionalValue: undefined,
    });
  };
  return (
    <gov-form-input name={question.id} on-gov-input={onChange}></gov-form-input>
  );
};

const renderMessage = (question: OtazkaDotazniku) => {
  if (String(question.napoveda).length === 0) {
    return null;
  }
  return (
    <gov-form-message slot='bottom' variant='secondary'>
      {question.napoveda}
    </gov-form-message>
  );
};

const computeError = (question: OtazkaDotazniku, props: FormPartProps): string | null => {
  const error = props.errors.find((error) => error.questionId === question.id) || null;
  if (error) {
    return (
      <gov-form-message slot='bottom' variant='error'>
        {error.message}
      </gov-form-message>
    );
  } else {
    return null;
  }
};
