import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { loadDesignSystemLibrary } from '../../utils/loader';
import { formInputGenerator } from '../form/FormParts';
import { Answer, AnswerControl, AnswerError } from '../../schema/Answer';
import { prepareAnswersForSubmit, validateClientAnswers } from '../../helpers/answer';
import { Dotaznik } from '../../schema/generated/types';
import { loadQuestionnaire, submitQuestionnaire } from '../../api';
import { errorTemplate, infoErrorTemplate, mainErrorTemplate } from '../templates/Error';
import { successTemplate } from '../templates/Success';
import { questionnaireTemplates } from '../templates/Questionaire';
import { isQuestionnaireClosed } from '../../helpers/questionnaire';

@Component({
  tag: 'mpsv-feedback',
  styleUrl: 'feedback.css',
  shadow: true,
})
export class Feedback {

  @Element() host: HTMLMpsvFeedbackElement;

  /**
   * Variant of questionnaire presentation
   */
  @Prop() presentation: 'standalone' | 'modal' = 'standalone';
  /**
   * Unique user code
   */
  @Prop() token: string;
  /**
   * Unique questionnaire code
   */
  @Prop() code: string;

  @State() govDesignSystemLoaded: boolean = false;
  @State() success: boolean = false;
  @State() error: boolean = false;
  @State() mainError: boolean = false;
  @State() closedError: boolean = false;
  @State() processing: boolean = false;
  @State() isDirty: boolean = false;
  @State() answers: Answer[] = [];
  @State() controls: AnswerControl[] = [];
  @State() errors: AnswerError[] = [];
  @State() questionnaire: Dotaznik;

  async componentWillLoad() {
    try {
      this.questionnaire = await loadQuestionnaire(this.code);
      await loadDesignSystemLibrary(this.host);
      this.govDesignSystemLoaded = true;
      if (this.questionnaire) {
        this.closedError = isQuestionnaireClosed(this.questionnaire);
      }
    } catch (e) {
      this.mainError = true;
    }
  }

  private validateQuestions() {
    const errors = validateClientAnswers(this.questionnaire.otazkaDotazniku, this.answers);
    this.errors = [...errors];
    return errors.length ? false : true;
  }

  render() {
    if (this.govDesignSystemLoaded === false) {
      return;
    }

    const questionareName = () => {
      if (this.questionnaire) {
        return this.questionnaire.nazev;
      }
      return 'Dotaník';
    };

    const contentRender = () => {
      if (this.mainError) {
        return mainErrorTemplate();
      }
      if (this.closedError) {
        return infoErrorTemplate();
      }
      if (this.success) {
        return successTemplate(true);
      }
      return (
        <div>
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
          {this.error ? errorTemplate() : null}
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
            label={questionareName()}
            id='modal'
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
        data.token = this.token;
        data.ipAdresa = '194.47.40.222';
        await submitQuestionnaire(data);
        this.success = true;
      } catch (e) {
        this.error = true;
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
}
