/// <reference types="react" />

declare namespace JSX {
  interface IntrinsicElements {
    // A-Frame core
    "a-scene": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      embedded?: boolean | string;
      "vr-mode-ui"?: string;
      arjs?: string;
    };
    "a-entity": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      "gltf-model"?: string;
      position?: string;
      rotation?: string;
      scale?: string;
      camera?: boolean | string;
    };
    "a-marker": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      type?: string;
      url?: string;
      preset?: string;
    };
  }
}
