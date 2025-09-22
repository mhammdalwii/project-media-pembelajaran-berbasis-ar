declare module "aframe-react" {
  import * as React from "react";

  interface EntityProps extends React.HTMLAttributes<HTMLElement> {
    primitive?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    geometry?: any;
    material?: never;
    position?: string;
    rotation?: string;
    scale?: string;
    src?: string;
    [key: string]: unknown;
  }

  interface SceneProps extends React.HTMLAttributes<HTMLElement> {
    embedded?: boolean;
    arjs?: string;
    [key: string]: unknown;
  }

  export class Entity extends React.Component<EntityProps> {}
  export class Scene extends React.Component<SceneProps> {}
}
