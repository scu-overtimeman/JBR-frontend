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
import UserInfoCard from '../views/UserInfoCard'
import AnalysisPage from '../views/AnalysisPage'

// import axios from 'axios'

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
      redirect: '/home/personalPage',
      children: [
        {
          path: '/home/personalPage',
          name: 'PersonalPage',
          meta:{
            requireAuth: true
          },
          component: PersonalPage,
          children: [
            {
              path:'/home/personalPage/userInfoCard',
              name: 'UserInfoCard',
              meta:{
                requireAuth: true
              },
              component: UserInfoCard
            }
          ],
          redirect:'/home/personalPage/userInfoCard'
        },
      ],
    },
    {
      path:'/',
      redirect:'/home'
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
          path: '/home/analysisPage',
          name: 'AnalysisPage',
          meta:{
            requireAuth: true
          },
          component: AnalysisPage
        },
      ]
    }
  ]
}

// 页面刷新时，重新赋值令牌中的用户信息
if (window.localStorage.getItem('user')) {
  store.commit(types.LOGIN, window.localStorage.getItem('user'))
}

const router = new Router(routes)

//跳转时，依权限决定重定向至登录页面
let redireByAuth = function(to, from, next){
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      //检查特定页面权限限制
      const URL = ''
      const CODE_SUCCESS = 200
      const CODE_FAIL = 500
      const CODE_ERROR = 500
      const CODE_NO_LOGIN = 300

      // axios
      //   .get(URL)
      //   .then((response)=>{
      //     console.log(response)
      //     if(response.status===CODE_SUCCESS){
      //       next();
      //     }
      //     else{
      //       alert("拒绝访问:权限不足")
      //     }
      //   })
      //   .catch((err)=>{
      //     console.log(err)
      //     alert('权限验证出错：无网络连接')
      //   })

      next()//正式部署时删除此行
    }
    else {
      next({
        path: '/logIn',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next()
  }
}

router.beforeEach((to, from, next) => {
  redireByAuth(to, from, next)
})

export default router
