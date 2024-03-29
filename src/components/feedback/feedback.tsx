import { Component, h, Element, State, Prop, Host, EventEmitter, Event, Method, Watch } from '@stencil/core';
import { loadDesignSystemLibrary } from '../../utils/loader';
import { formInputGenerator } from '../form/FormParts';
import { Answer, AnswerControl, AnswerError } from '../../schema/Answer';
import { prepareAnswersForSubmit, validateClientAnswers } from '../../helpers/answer';
import { Dotaznik } from '../../schema/generated/types';
import { loadQuestionnaire, submitQuestionnaire, verifyToken } from '../../api';
import { errorSubmitTemplate, filledErrorTemplate, infoErrorTemplate, mainErrorTemplate } from '../templates/Error';
import { successTemplate } from '../templates/Success';
import { questionnaireTemplates } from '../templates/Questionaire';
import { isQuestionnaireClosed } from '../../helpers/questionnaire';
import { GovModalElement } from '../../schema/Gov';
import {
  addToFilledQuestionnaires,
  createCustomerIdForQuestionnaire,
  isQuestionnaireFilled,
} from '../../helpers/control';

@Component({
  tag: 'mpsv-feedback',
  styleUrl: 'feedback.css',
  shadow: true,
})
export class Feedback {
  private modalRef?: GovModalElement;

  @Element() host: HTMLMpsvFeedbackElement;

  /**
   * Variant of questionnaire presentation
   */
  @Prop() presentation: 'standalone' | 'modal' = 'standalone';
  /**
   * Unique user token for database authentication. Not mandatory. If the token is empty, the browser token will be used.
   */
  @Prop() token: string = null;
  /**
   * Unique questionnaire code
   */
  @Prop() code: string;
  /**
   * View the questionnaire
   */
  @Prop() display: boolean = false;
  /**
   * Called after successful loading of the questionnaire
   */
  @Event({ eventName: 'mpsv-loaded' }) mpsvLoaded: EventEmitter<Dotaznik>;
  /**
   * Called after successful questionnaire submission
   */
  @Event({ eventName: 'mpsv-sent' }) mpsvSent: EventEmitter<Dotaznik>;
  /**
   * Called in case of a questionnaire submission error
   */
  @Event({ eventName: 'mpsv-sent-error' }) mpsvSentError: EventEmitter<Dotaznik>;
  /**
   * Called when questionnaire loading error
   */
  @Event({ eventName: 'mpsv-load-error' }) mpsvLoadError: EventEmitter<Error>;
  /**
   * Called when the questionnaire is closed. Only in the case of a dialogue
   */
  @Event({ eventName: 'mpsv-close' }) mpsvClose: EventEmitter;

  @State() govDesignSystemLoaded: boolean = false;
  @State() success: boolean = false;
  @State() viewQuestionnaire: boolean = false;
  @State() error: boolean = false;
  @State() mainError: boolean = false;
  @State() closedError: boolean = false;
  @State() tokenError: boolean = false;
  @State() processing: boolean = false;
  @State() isDirty: boolean = false;
  @State() customerHash: number = 0;
  @State() answers: Answer[] = [];
  @State() controls: AnswerControl[] = [];
  @State() errors: AnswerError[] = [];
  @State() questionnaire: Dotaznik;

  @Watch('display')
  validateVariant(newValue: boolean): void {
    this.viewQuestionnaire = newValue;
  }

  async componentWillLoad() {
    this.viewQuestionnaire = this.display;
    try {
      await loadDesignSystemLibrary(this.host);
      this.govDesignSystemLoaded = true;
      this.questionnaire = await loadQuestionnaire(this.code);

      if (this.customToken) {
        const verifyStatus = await verifyToken(this.token);
        if (verifyStatus === false) {
          this.tokenError = true;
        }
      } else {
        this.customerHash = createCustomerIdForQuestionnaire(this.questionnaire);
      }

      if (this.questionnaire) {
        this.closedError = isQuestionnaireClosed(this.questionnaire);
      }
      this.mpsvLoaded.emit(this.questionnaire);
    } catch (e) {
      this.mainError = true;
      this.mpsvLoadError.emit(e);
    }
  }

  get customToken(): string | null {
    return typeof this.token === 'string' && this.token.length ? this.token : null;
  }

  private validateQuestions() {
    const errors = validateClientAnswers(this.questionnaire.otazkaDotazniku, this.answers);
    this.errors = [...errors];
    return errors.length ? false : true;
  }

  render() {
    if (this.govDesignSystemLoaded === false || this.viewQuestionnaire === false) {
      return;
    }

    const questionareName = () => {
      if (this.questionnaire) {
        return this.questionnaire.nazev;
      }
      return 'Dotaník';
    };

    const contentRender = () => {
      const isModal = this.presentation === 'modal';
      if (isQuestionnaireFilled(this.customerHash) || this.tokenError) {
        return filledErrorTemplate();
      }
      if (this.mainError) {
        return mainErrorTemplate();
      }
      if (this.closedError) {
        return infoErrorTemplate();
      }
      if (this.success) {
        return successTemplate(isModal ? () => this.modalCloseHandler() : null);
      }
      return (
        <div>
          {!isModal ? (<h1>{this.questionnaire.nazev}</h1>) : null}
          {questionnaireTemplates(this.questionnaire).description()}
          {formRender()}
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
          {this.error ? errorSubmitTemplate() : null}
          <gov-button
            wcag-label={'Odeslat dotatník - ' + this.questionnaire.nazev}
            variant={'primary'}
            type={'solid'}
            native-type={'submit'}
            loading={this.processing ? 'true' : 'false'}
            size={'l'}>
            Odeslat
          </gov-button>
        </form>
      );
    };

    if (this.presentation === 'modal') {
      return (
        <Host>
          <gov-modal
            ref={el => (this.modalRef = el as GovModalElement)}
            label={questionareName()}
            id='modal'
            label-tag={'h1'}
            on-gov-close={this.modalCloseHandler.bind(this)}
            wcag-close-label={'Zavřít dialog - ' + questionareName()} open>
            {contentRender()}
          </gov-modal>
        </Host>
      );
    }
    return (
      <Host>
        {contentRender()}
      </Host>
    );
  }

  private async onSubmitHandler(e: SubmitEvent) {
    e.preventDefault();
    this.isDirty = true;
    if (this.validateQuestions()) {
      try {
        this.error = false;
        this.processing = true;
        const data = prepareAnswersForSubmit(this.questionnaire, this.answers);
        data.token = this.customToken ? this.token : this.customerHash.toString();
        await submitQuestionnaire(data);
        addToFilledQuestionnaires(this.customerHash);
        this.success = true;
        this.mpsvSent.emit(this.questionnaire);
      } catch (e) {
        this.error = true;
        this.mpsvSentError.emit(this.questionnaire);
      } finally {
        this.processing = false;
      }
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

  private modalCloseHandler() {
    if (this.modalRef) {
      this.modalRef.hide();
      this.mpsvClose.emit();
    }
  }

  /**
   * Closes the open questionnaire. (Only in case of modal)
   */
  @Method()
  async closeModal(): Promise<void> {
    if (this.modalRef) {
      this.modalRef.hide();
    }
  }
}
