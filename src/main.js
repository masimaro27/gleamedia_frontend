import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import _ from 'lodash'

library.add(faFontAwesome)
library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.prototype.$axios = axios;
Vue.prototype.$_ = _;

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
