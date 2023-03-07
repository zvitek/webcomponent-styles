import { Component, h, Element, State } from '@stencil/core';
import { loadDesignSystemLibrary } from '../../utils/loader';
import { formInputGenerator } from '../form/FormParts';
import questions from '../../mock/questions';
import { Answer, AnswerControl, AnswerError } from '../../schema/Answer';
import { validateClientAnswers } from '../../helpers/answer';

@Component({
  tag: 'mpsv-feedback',
  styleUrl: 'feedback.css',
  shadow: false,
})
export class Feedback {

  @Element() host: HTMLMpsvFeedbackElement;

  @State() govDesignSystemLoaded: boolean = false;
  @State() isDirty: boolean = false;
  @State() answers: Answer[] = [];
  @State() controls: AnswerControl[] = [];
  @State() errors: AnswerError[] = [];


  async componentWillLoad() {
    await loadDesignSystemLibrary(this.host);
    this.govDesignSystemLoaded = true;
  }

  private validateQuestions() {
    const errors = validateClientAnswers(questions.otazkaDotazniku, this.answers);
    this.errors = [...errors];
    return errors.length ? false : true;
  }

  render() {
    if (this.govDesignSystemLoaded === false) {
      return;
    }
    return (
      <div>
        <h2>{questions.nazev}</h2>
        <p>{questions.popis}</p>
        <form novalidate onSubmit={this.onSubmitHandler.bind(this)}>
          {questions.otazkaDotazniku.map((question) => formInputGenerator(question, {
            answers: this.answers,
            errors: this.errors,
            controls: this.controls,
            onAnswerUpdate: this.onAnswerUpdateHandler.bind(this),
            onControlUpdate: this.onAnswerControlHandler.bind(this),
          }))}
          <gov-button variant={'primary'} type={'solid'} native-type={'submit'}>Odeslat</gov-button>
        </form>
      </div>
    );
  }

  private onSubmitHandler(e: SubmitEvent) {
    e.preventDefault();
    this.isDirty = true;
    if (this.validateQuestions()) {
      console.log('submited');
    }
  };

  private onAnswerUpdateHandler(answer: Answer) {
    const answers = this.answers;
    const questionIndex = answers.findIndex((a) => a.questionId === answer.questionId);
    if (questionIndex !== -1) {
      answers.splice(questionIndex, 1);
    }
    answers.push(answer);
    this.answers = [...answers];

    if (this.isDirty) {
      this.validateQuestions();
    }
  }

  private onAnswerControlHandler(control: AnswerControl) {
    const controls = this.controls;
    const questionIndex = controls.findIndex((c) => c.questionId === control.questionId);
    if (questionIndex !== -1) {
      controls.splice(questionIndex, 1);
    }
    controls.push(control);
    this.controls = [...controls];
  }
}
