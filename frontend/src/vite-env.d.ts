/// <reference types="vite/client" />

// Esta línea le dice a TypeScript que puede importar archivos .css y .scss sin dar un error de tipos.
declare module "*.css" {
  const content: { [className: string]: string };
  export default content;
}