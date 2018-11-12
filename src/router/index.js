import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import head from '@/components/head/headOne'
import login from '@/views/login'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,

    },
    {
      path:'/two',
      name:'head',
      component:head
    },

    {
      path:'/login',
      component:login
    },

  ]
})
