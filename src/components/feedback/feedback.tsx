import { Component, h, Element, State } from '@stencil/core';
import { loadDesignSystemLibrary } from '../../utils/loader';
import { formInputGenerator } from '../form/FormParts';
import questions from '../../mock/questions';
import { Answer, AnswerError } from '../../schema/Answer';

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
  @State() errors: AnswerError[] = [];


  async componentWillLoad() {
    await loadDesignSystemLibrary(this.host);
    this.govDesignSystemLoaded = true;
  }

  private validateQuestions() {
    this.errors = [];
    const errors = [];
    questions.otazkaDotazniku.map((question) => {
      if (question.povinnostOdpovedi === false) {
        return;
      }
      const answer = this.answers.find((answer) => answer.questionId === question.id) || null;
      if (answer === null) {
        errors.push({
          questionId: question.id,
          message: 'Tato otázka je povinná',
        });
      } else if (question.viceOdpovedi && (Array.isArray(answer.value) && answer.value.length === 0)) {
        errors.push({
          questionId: question.id,
          message: 'Vyberte alespoň jednu odpověď',
        });
      } else if (question.viceOdpovedi === false && String(answer.value).length === 0) {
        errors.push({
          questionId: question.id,
          message: 'Zadejte, prosím, odpověď',
        });
      }
    });

    this.errors = [...errors];
    return errors.length ? false : true;
  }

  render() {
    if (this.govDesignSystemLoaded === false) {
      return;
    }

    const onAnswerUpdate = (answer: Answer) => {
      const answers = this.answers;
      const questionIndex = answers.findIndex((a) => a.questionId === answer.questionId);
      if (questionIndex !== -1) {
        answers.splice(questionIndex, 1);
      }
      answers.push(answer);
      this.answers = [...answers];

      if(this.isDirty) {
        this.validateQuestions()
      }
    };

    const submitHandler = (e: SubmitEvent) => {
      e.preventDefault();
      this.isDirty = true;
      if (this.validateQuestions()) {
        console.log('submited');
      }
    };

    return (
      <div>
        <h2>{questions.nazev}</h2>
        <p>{questions.popis}</p>
        <form novalidate onSubmit={submitHandler}>
          {questions.otazkaDotazniku.map((question) => formInputGenerator(question, {
            answers: this.answers,
            errors: this.errors,
            onAnswerUpdate,
          }))}
          <gov-button variant={'primary'} type={'solid'} native-type={'submit'}>Odeslat</gov-button>
        </form>
      </div>
    );
  }
}
