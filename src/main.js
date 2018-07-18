import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import './styles.scss'
import router from './router'
import store from './store'
import firebase from 'firebase'
import { config } from './firebase.config'

firebase.initializeApp(config)
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
