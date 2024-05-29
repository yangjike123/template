/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string;
    readonly VITE_REQUEST_URL: string;
    readonly NODE_ENV: string;
    readonly VITE_PROXY_BASE: string;
}
declare interface ImportMeta {
    readonly env: ImportMetaEnv
}