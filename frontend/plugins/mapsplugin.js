import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation/src'

Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'YOUR_GOOGLE_MAPS_JS_API_KEY',
    libraries: 'places'
  },
  installComponents: true
})
