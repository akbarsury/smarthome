import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true
  },
  nitro: {
    experimental: {
      websocket: true
    },
  },
  devServer: {
    port: 6051
  },
  extends: [
    // '../api-auth'
  ],
  runtimeConfig: {
    authSecret: '123!0-21n',
    authOrigin: 'http://localhost:3000',
    wsNodeCredential: "xxx",
    public: {
      wsNodeCredential: "xxx"
    }
  },
  modules: [
    "@nuxt/icon",
    "@nuxt/image",
    "@nuxtjs/seo",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@sidebase/nuxt-auth",
    "@vueuse/nuxt",
    "nitro-cloudflare-dev",
  ],
  css: [
    fileURLToPath(new URL("./resources/styles/scss/main.scss", import.meta.url)).toString()
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1.0 minimum-scale=1.0 maximum-scale=5.0 user-scalable=false',
      htmlAttrs: {
        lang: 'id-ID'
      },
      link: [
        {
          rel: "icon",
          href: "/icon/favicon.png",
          sizes: "any"
        },
        {
          rel: "icon",
          href: "/icon/pwa-64x64.png",
          "sizes": "64x64",
          "type": "image/png"
        },
        {
          rel: "icon",
          href: "/icon/pwa-192x192.png",
          "sizes": "192x192",
          "type": "image/png"
        },
        {
          rel: "icon",
          href: "/icon/pwa-512x512.png",
          "sizes": "512x512",
          "type": "image/png"
        },
        {
          rel: "icon",
          href: "/icon/maskable-icon-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
        }
      ],
      script: [
      ]
    }
  },
  vueuse: {},
  seo: {
    automaticDefaults: true,
    debug: true,
    fallbackTitle: false,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  icon: {

    provider: 'iconify',
    serverBundle: false,
    clientBundle: {
      icons: [
        'mi:computer',
        'cuida:lamp-outline',
        'mingcute:speaker-line',
        'uil:server'
      ],
    }
  },
  site: {
    url: 'http://akbar-smarthome.arahcloud.xyz/',
    name: 'Akbar SmartHome',
    description: 'Controling home from anywhere',
    defaultLocale: 'id',
    indexable: false,
  },
  pinia: {
    storesDirs: [
      fileURLToPath(new URL('./resources/stores', import.meta.url)).toString(),
    ]
  },
  tailwindcss: {
    cssPath: [
      fileURLToPath(new URL("./resources/styles/scss/main.scss", import.meta.url)).toString(), { injectPosition: "first" }
    ],
    exposeConfig: true,
    viewer: true,
  },
  auth: {
    isEnabled: false,
    globalAppMiddleware: false,
    disableServerSideAuth: true,
    originEnvKey: "NUXT_AUTH_ORIGIN",
    baseURL: `${process.env.NUXT_AUTH_ORIGIN}/api/v1.0/auth/`,
    provider: {
      type: 'authjs',
      defaultProvider: "akbarSmarthomeAuthentication",
      addDefaultCallbackUrl: true,
    },
    sessionRefresh: {
      enablePeriodically: 60000,
      enableOnWindowFocus: true,
    }
  },
})
