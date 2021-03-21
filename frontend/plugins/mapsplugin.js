import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation/src'

Vue.use(VueGeolocation)
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCmWCcrwpgkuUYawPoxnmsxGjN29AbL_kU',
    libraries: 'places'
  },
  installComponents: true
})
