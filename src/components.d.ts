/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { Dotaznik } from "./schema/generated/types";
export { Dotaznik } from "./schema/generated/types";
export namespace Components {
    interface MpsvFeedback {
        /**
          * Closes the open questionnaire. (Only in case of modal)
         */
        "closeModal": () => Promise<void>;
        /**
          * Unique questionnaire code
         */
        "code": string;
        /**
          * View the questionnaire
         */
        "display": boolean;
        /**
          * Variant of questionnaire presentation
         */
        "presentation": 'standalone' | 'modal';
        /**
          * Unique user token for database authentication. Not mandatory. If the token is empty, the browser token will be used.
         */
        "token": string;
    }
}
export interface MpsvFeedbackCustomEvent<T> extends CustomEvent<T> {
    detail: T;
    target: HTMLMpsvFeedbackElement;
}
declare global {
    interface HTMLMpsvFeedbackElement extends Components.MpsvFeedback, HTMLStencilElement {
    }
    var HTMLMpsvFeedbackElement: {
        prototype: HTMLMpsvFeedbackElement;
        new (): HTMLMpsvFeedbackElement;
    };
    interface HTMLElementTagNameMap {
        "mpsv-feedback": HTMLMpsvFeedbackElement;
    }
}
declare namespace LocalJSX {
    interface MpsvFeedback {
        /**
          * Unique questionnaire code
         */
        "code"?: string;
        /**
          * View the questionnaire
         */
        "display"?: boolean;
        /**
          * Called when the questionnaire is closed. Only in the case of a dialogue
         */
        "onMpsv-close"?: (event: MpsvFeedbackCustomEvent<any>) => void;
        /**
          * Called when questionnaire loading error
         */
        "onMpsv-load-error"?: (event: MpsvFeedbackCustomEvent<Error>) => void;
        /**
          * Called after successful loading of the questionnaire
         */
        "onMpsv-loaded"?: (event: MpsvFeedbackCustomEvent<Dotaznik>) => void;
        /**
          * Called after successful questionnaire submission
         */
        "onMpsv-sent"?: (event: MpsvFeedbackCustomEvent<Dotaznik>) => void;
        /**
          * Called in case of a questionnaire submission error
         */
        "onMpsv-sent-error"?: (event: MpsvFeedbackCustomEvent<Dotaznik>) => void;
        /**
          * Variant of questionnaire presentation
         */
        "presentation"?: 'standalone' | 'modal';
        /**
          * Unique user token for database authentication. Not mandatory. If the token is empty, the browser token will be used.
         */
        "token"?: string;
    }
    interface IntrinsicElements {
        "mpsv-feedback": MpsvFeedback;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "mpsv-feedback": LocalJSX.MpsvFeedback & JSXBase.HTMLAttributes<HTMLMpsvFeedbackElement>;
        }
    }
}
