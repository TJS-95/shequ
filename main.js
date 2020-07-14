import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// 全局组件
import divider from './components/commom/divider.vue'
Vue.component('divider', divider)
import noThing from './components/commom/no-thing.vue'
Vue.component('no-thing', noThing)

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
