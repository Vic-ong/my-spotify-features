declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>;
  export default component;
}
// declare process env
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VITE_API_ENDPOINT: string;
    VITE_SPOTIFY_API_ENDPOINT: string;
  }
}
