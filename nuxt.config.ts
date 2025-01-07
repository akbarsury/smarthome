import { fileURLToPath } from "url";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: {
    enabled: true
  },
  nitro: {
    experimental: {
      websocket: true,
      asyncContext: true
    },
    storage: {
      db: {
        driver: "fs",
      }
    },
    devStorage: {
      db: {
        driver: "fs",
        base: "./data-file/db"
      }
    }
  },
  devServer: {
    port: 6051
  },
  runtimeConfig: {
    authSecret: "123!0-21n",
    smarthomeAuthOrigin: "http://localhost:3000",
    nodeCredential: "xxx",
    firebaseApiKey: "xxx",
    public: {
      nodeSerialNumber: "xxx"
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
  ],
  css: [
    fileURLToPath(new URL("./resources/styles/scss/main.scss", import.meta.url)).toString()
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1.0 minimum-scale=1.0 maximum-scale=5.0 user-scalable=false",
      htmlAttrs: {
        lang: "id-ID"
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
  image: {
    dir: "resources/images"
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
    provider: "iconify",
    serverBundle: false,
  },
  site: {
    url: "http://your-url.xyz/",
    name: "Arah SmartHome",
    description: "Controling home from anywhere",
    defaultLocale: "id",
    indexable: false,
  },
  pinia: {
    storesDirs: [
      fileURLToPath(new URL("./resources/stores", import.meta.url)).toString(),
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
    isEnabled: true,
    globalAppMiddleware: {
      isEnabled: true,
      addDefaultCallbackUrl: false,
      allow404WithoutAuth: true
    },
    disableServerSideAuth: false,
    baseURL: process.env.NUXT_SMARTHOME_ORIGIN ? `${process.env.NUXT_SMARTHOME_ORIGIN}/auth` : '/auth',
    provider: {
      type: "authjs",
      trustHost: true,
      defaultProvider: "ArahSmarthomeCredentialProvider",
      addDefaultCallbackUrl: false,
    },
    sessionRefresh: {
      enablePeriodically: 60000,
      enableOnWindowFocus: true,
    }
  },
})
