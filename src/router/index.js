import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/types'

Vue.use(Router)

import LogIn from '../components/LogIn'
import Home from '../components/Home'

//views conponents:
import LogInCard from '../views/LogInCard'
import RegistCard from '../views/RegistCard'
import PersonalPage from '../views/PersonalPage'

const routes = {
  routes: [
    {
      path: '/logIn',
      name: 'LogIn',
      component: LogIn,
      children: [
        {
          path: '/logIn/logInCard',
          name: 'LogInCard',
          component: LogInCard
        },
        {
          path:'/logIn/registCard',
          name:'RegistCard',
          component:RegistCard
        },
        {
          path:'/logIn',
          redirect:'/logIn/logInCard'
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      meta:{
        requireAuth: true
      },
      component: Home,
      children: [
        {
          path: '/home/personalPage',
          name: 'PersonalPage',
          meta:{
            requireAuth: true
          },
          component: PersonalPage
        },
      ]
    },
    {
      path:'/',
      redirect:'/home'
    }
  ]
}

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'))
}

const router = new Router(routes)

router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/logIn',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router
