// <reference types="vite/client" />

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}
interface ImportMetaEnv {
  readonly VITE_API_KEY_1: string; 
  readonly VITE_API_KEY_2: string; 
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}