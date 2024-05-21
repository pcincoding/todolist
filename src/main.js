import Vue from 'vue'
import App from './App.vue'
import FontAwesome from './FontAwesome/css/all.css'

Vue.use(FontAwesome)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
