/// <reference types="vite/client" />

declare module '*.svg' {
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
