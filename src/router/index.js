import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import login from '@/views/login'

Vue.use(Router);

export const bars=
  [
    {
      path: '/',
      name: 'index',
      component: index,

    },

    {
      path:'/login',
      component:login
    },

  ];

export const constantRouterMap = [

];




const router = new Router({

    routes: constantRouterMap.concat(bars)
});

router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next()

    }

    next()
});

router.afterEach((to, from) => {

   //
});

export default router



