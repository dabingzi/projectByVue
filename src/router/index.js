import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import head from '@/components/head/headOne'
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
      path:'/two',
      name:'head',
      component:head
    },

    {
      path:'/login',
      component:login
    },

  ];

export const constantRouterMap = [
    {
        path: '/',
        redirect: '@/views/login',  // 重定向暂时还用登录页
        hidden: true
    },
    { path: '/login', component: () => import('@/views/login'), hidden: true },
    // { path: '/404', component: () => import('@/views/404'), hidden: true },   暂时没

]




const router = new Router({

    routes: constantRouterMap.concat(bars)
});

router.beforeEach((to, from, next) => {

    if (to.path === '/login') {
        next()

    }

    next()
})

router.afterEach((to, from) => {

   //
});

export default router



