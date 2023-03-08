import { h } from '@stencil/core';
import { OtazkaDotazniku } from '../../schema/generated/types';
import { Answer, AnswerControl, AnswerError } from '../../schema/Answer';
import { isAdditionalAnswerAvailable } from '../../helpers/question';
import { isQuestionAnswered } from '../../helpers/answer';
import { isActiveAdditionalAnswer } from '../../helpers/control';

export interface FormPartProps {
  onAnswerUpdate: (answer: Answer) => void;
  onControlUpdate: (control: AnswerControl) => void;
  answers: Answer[];
  errors: AnswerError[];
  controls: AnswerControl[];
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
    <div class={'mpsv-form-control'}>
      <gov-form-control invalid={error ? true : false}>
        <gov-form-label size='xl' slot='top'>{question.popisOtazky}</gov-form-label>
        <gov-form-group>
          {component}
        </gov-form-group>
        {renderMessage(question)}
        {error}
      </gov-form-control>
      {renderCustomAnswer(question, props)}
    </div>
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
    props.onControlUpdate({
      questionId: question.id,
      additional: false,
    });
  };
  const options = question.moznostOdpovedi.filter((answer) => answer.typ === false);
  return options.map((option) => {
    return (
      <gov-form-radio name={question.id} value={option.id} on-gov-change={onChange} required={question.povinnostOdpovedi}>
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
    props.onControlUpdate({
      questionId: question.id,
      additional: false,
    });
  };
  const options = question.moznostOdpovedi.filter((answer) => answer.typ === false);
  return (
    options.map((option) => {
      return (
        <gov-form-checkbox name={question.id + option.id} value={option.id} on-gov-change={onChange} required={question.povinnostOdpovedi}>
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
    <gov-form-input name={question.id} on-gov-input={onChange} required={question.povinnostOdpovedi}></gov-form-input>
  );
};

const renderMessage = (question: OtazkaDotazniku) => {
  if (String(question.napoveda).length === 0 || question.napoveda === undefined) {
    return null;
  }
  return (
    <gov-form-message slot='bottom' variant='secondary'>
      {question.napoveda}
    </gov-form-message>
  );
};

const renderCustomAnswer = (question: OtazkaDotazniku, props: FormPartProps) => {
  const answer = isQuestionAnswered(question, props.answers);
  if (isAdditionalAnswerAvailable(question)) {
    let isActive = isActiveAdditionalAnswer(question, props.controls);
    const onChangeCustomValue = (e: CustomEvent) => {
      props.onControlUpdate({
        questionId: question.id,
        additional: e.detail.checked,
      });
      if (e.detail.checked === false) {
        props.onAnswerUpdate({
          questionId: question.id,
          value: question.moznostOdpovedi.length > 0 ? [] : undefined,
          additionalValue: undefined,
        });
      }
    };
    const onChange = (e: CustomEvent) => {
      const target = e.target as HTMLInputElement;
      props.onAnswerUpdate({
        questionId: question.id,
        value: question.moznostOdpovedi.length > 0 ? [] : undefined,
        additionalValue: target.value,
      });
    };
    return (
      <div class={'mpsv-form-control__custom-answer'}>
        <gov-form-control>
          <gov-form-group>
            <gov-form-checkbox checked={isActive} name={question.id + 'custom'} on-gov-change={onChangeCustomValue}>
              <gov-form-label slot='label'>Vlastní odpověď</gov-form-label>
            </gov-form-checkbox>
          </gov-form-group>
        </gov-form-control>

        {(answer && answer.additionalValue) || isActive ? (
          <div>
            <gov-form-control>
              <gov-form-group>
                <gov-form-input name={question.id + 'custom-value'} on-gov-input={onChange}></gov-form-input>
              </gov-form-group>
            </gov-form-control>
          </div>
        ) : null}
      </div>
    );
  }
};

const computeError = (question: OtazkaDotazniku, props: FormPartProps): string | null => {
  const error = props.errors.find((error) => error.questionId === question.id) || null;
  if (error) {
    return (
      <gov-form-message slot='bottom' variant='error'>
        <gov-icon slot="icon" name="warning"></gov-icon>
        {error.message}
      </gov-form-message>
    );
  } else {
    return null;
  }
};
