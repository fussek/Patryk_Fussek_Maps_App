export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/services.js",
    "~/plugins/interceptor.js",
    "~/plugins/bootstrapvue.js",
    "~/plugins/mapsplugin.js",
    "~/plugins/composition-api-plugin.js",
    { src: "~/plugins/slide-menu.js", ssr: false },
    { src: '~/plugins/amcharts.js', ssr: false }
  ],
  // consider using this. autoimports components
  // components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    "@nuxtjs/eslint-module",
    '@nuxtjs/vuetify',
    '@nuxtjs/fontawesome',
  ],
  //todo: limit only to the icons used
  fontawesome: {
    component: 'fa',
    icons: {
      solid: true,
      brands: true
    }
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    host: "localhost",
    prefix: "/api/"
  },
  proxy: {
    "/api/": process.env.PROXY_API || "http://localhost:8080/"
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'vue2-google-maps',
      'vue-browser-geolocation',
      '@amcharts/amcharts4'
    ],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        const options = {
          exclude: ['node_modules']
        }
        const EslintPlugin = require('eslint-webpack-plugin')
        config.plugins.push(new EslintPlugin(options))
      }
    }
  }
};
