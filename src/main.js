import Vue from 'vue'
import './plugins/vuetify'
import './plugins/vuetify'
import App from './App'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
import router from './router'
import JsonExcel from 'vue-json-excel'

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBKpXRY7VC7YdiRMzcHa9PAUWp1Td0YtCk',
  }
})

Vue.use(VueGeolocation)

Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyArdVsYOcRlozBBgvCOBbsvf1AQZLCxqaM",
    authDomain: "nomuiscas.firebaseapp.com",
    databaseURL: "https://nomuiscas.firebaseio.com",
    projectId: "nomuiscas",
    storageBucket: "nomuiscas.appspot.com",
    messagingSenderId: "347679981810"
})
export const db = firebase.firestore()

Vue.component('downloadExcel', JsonExcel)

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
