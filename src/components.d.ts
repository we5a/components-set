/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MainModal {
        "cancelModal": () => void;
        "handleResult": (name: string) => void;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
        "sayHello": () => Promise<number>;
    }
    interface PlayerOutput {
        "message": string;
    }
    interface WebcamPlayer {
        "getPersons": () => Promise<Person[]>;
    }
}
declare global {
    interface HTMLMainModalElement extends Components.MainModal, HTMLStencilElement {
    }
    var HTMLMainModalElement: {
        prototype: HTMLMainModalElement;
        new (): HTMLMainModalElement;
    };
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLPlayerOutputElement extends Components.PlayerOutput, HTMLStencilElement {
    }
    var HTMLPlayerOutputElement: {
        prototype: HTMLPlayerOutputElement;
        new (): HTMLPlayerOutputElement;
    };
    interface HTMLWebcamPlayerElement extends Components.WebcamPlayer, HTMLStencilElement {
    }
    var HTMLWebcamPlayerElement: {
        prototype: HTMLWebcamPlayerElement;
        new (): HTMLWebcamPlayerElement;
    };
    interface HTMLElementTagNameMap {
        "main-modal": HTMLMainModalElement;
        "my-component": HTMLMyComponentElement;
        "player-output": HTMLPlayerOutputElement;
        "webcam-player": HTMLWebcamPlayerElement;
    }
}
declare namespace LocalJSX {
    interface MainModal {
        "cancelModal"?: () => void;
        "handleResult"?: (name: string) => void;
    }
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface PlayerOutput {
        "message"?: string;
    }
    interface WebcamPlayer {
        "onScreenshotReceived"?: (event: CustomEvent<any>) => void;
    }
    interface IntrinsicElements {
        "main-modal": MainModal;
        "my-component": MyComponent;
        "player-output": PlayerOutput;
        "webcam-player": WebcamPlayer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "main-modal": LocalJSX.MainModal & JSXBase.HTMLAttributes<HTMLMainModalElement>;
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "player-output": LocalJSX.PlayerOutput & JSXBase.HTMLAttributes<HTMLPlayerOutputElement>;
            "webcam-player": LocalJSX.WebcamPlayer & JSXBase.HTMLAttributes<HTMLWebcamPlayerElement>;
        }
    }
}
