// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  nitro: {
    experimental: {
      websocket: true,
      asyncContext: true
    },
    preset: 'cloudflare-worker'
  },
  devServer: {
    port: 6051
  },
  modules: [
    "@nuxtjs/seo",
    "@vueuse/nuxt",
    "nitro-cloudflare-dev",
  ],
  seo: {
    debug: true,
  },
})
