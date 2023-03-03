import { Component, h, Element, State } from '@stencil/core';
import { loadDesignSystemLibrary } from '../../utils/loader';

@Component({
  tag: 'mpsv-feedback',
  styleUrl: 'feedback.css',
  shadow: true,
})
export class Feedback {

  @Element() host: HTMLMpsvFeedbackElement;

  @State() govDesignSystemLoaded: boolean = false;


  async componentWillLoad() {
    await loadDesignSystemLibrary(this.host);
    this.govDesignSystemLoaded = true;
  }

  render() {
    if (this.govDesignSystemLoaded === false) {
      return;
    }
    return <gov-button variant='primary' type='solid'>MPSV Feedback</gov-button>;
  }
}
