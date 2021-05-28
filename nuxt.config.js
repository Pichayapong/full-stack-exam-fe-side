export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-midone-icewall-template',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  // server: {
  //   port: process.env.PORT || 3000,
  //   host: '0.0.0.0',
  //   timing: false,
  //   // timing: false,
  // },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins vue-feather-icons
  plugins: [
    { src: '~/plugins/axios.js' },
    { src: '~/plugins/velocity.js', mode: 'client' },
    { src: '~/plugins/vue-feather-icons.js' },
    { src: '~/plugins/vue-tippy.js', mode: 'client' },
    { src: '~/plugins/vue-good-table.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  loading: '~/components/LoadingBar.vue',
  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/auth-next',
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    'vue-sweetalert2/nuxt',
  ],
  sweetalert: {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
    confirmButtonText: 'ตกลง',
  },
  axios: {
    baseURL: 'https://dev-api.vega369.com',
    progress: false,
  },
  auth: {
    localStorage: false,
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        // secure: true,
        // sameSite: 'lax',
        // httpOnly: true,
        // maxAge: 60 * 60 * 24 * 7,
      },
    },
    redirect: {
      login: '/',
      logout: '/login',
    },
    strategies: {
      local: {
        token: {
          property: 'token.access',
        },
        endpoints: {
          login: {
            url: '/auth-admin/login',
            method: 'post',
          },
          user: { url: '/auth-admin/admin', method: 'get' },
          logout: false,
        },
        user: {
          property: false,
          autoFetch: true,
        },
      },
    },
  },
  tailwindcss: {
    cssPath: '~/assets/sass/_tailwind.scss',
    jit: true,
    exposeConfig: true,
  },

  styleResources: {
    scss: ['~/assets/sass/custom.scss', '~/assets/sass/app.scss'],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // analyze: true,
  },
}
