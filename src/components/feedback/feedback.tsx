import { Component, h, Element, State, Prop } from '@stencil/core';
import { loadDesignSystemLibrary } from '../../utils/loader';
import { formInputGenerator } from '../form/FormParts';
import questions from '../../mock/questions';
import { Answer, AnswerControl, AnswerError } from '../../schema/Answer';
import { validateClientAnswers } from '../../helpers/answer';
import { Dotaznik } from '../../schema/generated/types';

@Component({
  tag: 'mpsv-feedback',
  styleUrl: 'feedback.css',
  shadow: true,
})
export class Feedback {

  @Element() host: HTMLMpsvFeedbackElement;

  @Prop() presentation: 'standalone' | 'modal' = 'standalone';

  @State() govDesignSystemLoaded: boolean = false;
  @State() success: boolean = false;
  @State() error: boolean = false;
  @State() processing: boolean = false;
  @State() isDirty: boolean = false;
  @State() answers: Answer[] = [];
  @State() controls: AnswerControl[] = [];
  @State() errors: AnswerError[] = [];
  @State() questionnaire: Dotaznik;


  async componentWillLoad() {
    await loadDesignSystemLibrary(this.host);
    this.govDesignSystemLoaded = true;
    this.questionnaire = questions;
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

    const renderError = () => {
      return (
        <gov-message variant='error'>
          <gov-icon name='info' slot='icon'></gov-icon>
          <p class={'gov-color--error-500'}>
            Formulář se nepodařilo odeslat, zkuste to, prosím, znovu anebo nás kontaktujte.
          </p>
        </gov-message>
      );
    };

    const renderSuccess = (closeButton: boolean = false) => {
      return (
        <div class={'mpsv-form__success'}>
          <gov-empty>
            <gov-icon slot='icon' name='doc-review' type='complex'></gov-icon>
            <p class='gov-text--4xl gov-color--success-500 gov-mb--unset'>Odesláno</p>
            <p class='gov-text--l gov-color--secondary-700'>
              Děkujeme za odeslaní zpětná vazby.
            </p>
            <gov-spacer size={'l'}></gov-spacer>
            {closeButton ? (
              <gov-button variant={'primary'} type={'outlined'}>Zavřít</gov-button>
            ) : null}
          </gov-empty>
        </div>
      );
    };

    const renderDescription = () => {
      if (String(this.questionnaire.popis).length === 0 || !this.questionnaire.popis) {
        return null;
      }
      return (
        <div>
          <p>{this.questionnaire.popis}</p>
          <gov-spacer size={'xl'}></gov-spacer>
        </div>
      );
    };

    const formRender = () => {
      return (
        <form noValidate onSubmit={this.onSubmitHandler.bind(this)}>
          {this.questionnaire.otazkaDotazniku.map((question) => formInputGenerator(question, {
            answers: this.answers,
            errors: this.errors,
            controls: this.controls,
            onAnswerUpdate: this.onAnswerUpdateHandler.bind(this),
            onControlUpdate: this.onAnswerControlHandler.bind(this),
          }))}
          <gov-button
            wcag-label={'Odeslat dotatník - ' + this.questionnaire.nazev}
            variant={'primary'}
            type={'solid'}
            native-type={'submit'}
            loading={this.processing ? 'true' : 'false'}
            size={'l'}>
            Odeslat
          </gov-button>
          {this.error ? renderError() : null}
        </form>
      );
    };

    if (this.presentation === 'modal') {
      return (
        <gov-modal label={this.questionnaire.nazev} id='modal'
                   wcag-close-label={'Zavřít dialog - ' + this.questionnaire.nazev} open>
          {this.success ? (
            renderSuccess(true)
          ) : (
            <div>
              {renderDescription()}
              {formRender()}
            </div>
          )}
        </gov-modal>
      );
    }
    return (
      <div>
        {this.success ? (
          renderSuccess(true)
        ) : (
          <div>
            <h2>{this.questionnaire.nazev}</h2>
            {renderDescription()}
            {formRender()}
          </div>
        )}
      </div>
    );
  }

  private onSubmitHandler(e: SubmitEvent) {
    e.preventDefault();
    this.isDirty = true;
    if (this.validateQuestions()) {
      this.processing = true;
      this.success = true;
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
