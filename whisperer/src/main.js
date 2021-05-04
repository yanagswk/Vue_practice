import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUser, faSignOutAlt, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCompositionApi from "@vue/composition-api";

library.add(
  faUser,
  faSignOutAlt,
  faEllipsisV
)


Vue.use(VueCompositionApi); 

import { firestorePlugin } from 'vuefire'          
import firebase from 'firebase'     
import 'firebase/firestore'

Vue.use(firestorePlugin)

firebase.initializeApp({                
    apiKey: process.env.VUE_APP_API_KEY,
    authDomain: process.env.VUE_APP_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_PROJECT_ID,
    storageBucket: process.env.VUE_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_APP_ID,
    measurementId: process.env.VUE_APP_MEASUREMENT_ID,
})


export const db = firebase.firestore()
export const auth = firebase.auth()



Vue.component('fa', FontAwesomeIcon)


Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
