import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import List from '@/pages/list'
import SignUp from '@/pages/signUp'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/list',
      name: 'List',
      component: List
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: SignUp
    }
  ]
})
