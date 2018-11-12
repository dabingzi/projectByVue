import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import HelloWorld from '@/components/HelloWorld'
import head from '@/components/head/headOne'
import login from '@/views/login'
import testVue from '@/views/views'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,

    },
    {
      path: '/one',
      name: 'HelloWorld',
      component: HelloWorld,

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
