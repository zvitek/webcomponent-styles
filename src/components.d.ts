/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MpsvFeedback {
        "presentation": 'standalone' | 'modal';
    }
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
        "presentation"?: 'standalone' | 'modal';
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
