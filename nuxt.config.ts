// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  nitro: {
    prerender: {
      crawlLinks: true, // Auto-detect links
    },
    preset: process.env.STORYBLOK_VERSION === 'draft' ? 'isr' : 'static',
  },
  runtimeConfig: {
    public: {
      VERSION: process.env.STORYBLOK_VERSION
    }
  },
  site: {
    url: 'https://rosbothamfinance.com'
  },
  modules: [
    '@nuxtjs/tailwindcss',
    ["@storyblok/nuxt", { 
      accessToken: process.env.STORYBLOK_ACCESS_TOKEN,
      apiOptions: {
        region: "eu"
      } 
    }],
    'nuxt3-meta-pixel',
    '@nuxt/image',
    'nuxt-simple-robots',
    !!process.env.GTAG_ID ?
    ['nuxt-gtag', {
      id: process.env.GTAG_ID,
      config: {
        page_title: 'Rosbotham Finance Website'
      }
    }] : null,
  ],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  image: {
    storyblok: {
      baseURL: 'https://a.storyblok.com'
    },
    dir: 'assets/img'

  },
  facebook: {
    /* module options */
    track: 'PageView',
    pixelId: '896755728853427',
    autoPageView: true,
    disabled: false
  },
  css: ['assets/css/main.css'],
  devtools: { enabled: true },
  app:{
    pageTransition: {name: 'page', mode: 'out-in'},
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Poppins&display=swap" },
        { rel: "apple-touch-icon", sizes:"180x180", href: "/favicons/apple-touch-icon.png" },
        { rel: "icon", type:"image/png", sizes:"32x32", href:"/favicons/favicon-32x32.png" },
        { rel: "icon", type:"image/png", sizes:"16x16", href:"/favicons/favicon-16x16.png" },
        { rel: "manifest", href:"/favicons/site.webmanifest" },
        { rel: "mask-icon", href:"/favicons/safari-pinned-tab.svg", color:"#5bbad5" }
      ],
      meta: [
        { name:"msapplication-TileColor", content:"#00aba9"},
        { name:"theme-color", content:"#ffffff" },
        { name:"facebook-domain-verification", content: process.env.FACEBOOK_VERIFICATION_TOKEN}
      ]
    }
  },
  experimental: {
    componentIslands: true,
    payloadExtraction: true
  }
})
