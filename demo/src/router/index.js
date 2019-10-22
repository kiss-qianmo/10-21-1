import Vue from 'vue'
import Router from 'vue-router'
import index from '@/pages/index'
import tips from '@/pages/tips'
import login from '@/pages/login'
import manage from '@/pages/manage'
import banner from '@/pages/banner'
import teacher from '@/pages/teacher'
import water from '@/pages/water'
import repair from '@/pages/repair'
import home from '@/pages/home'
import pass from '@/pages/pass'
import adminManage from '@/pages/adminManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 登录路由
      path: '/login',
      name: 'login',
      component: login
    },
    {
      // 进入管理系统首页，显示上、左、右
      path: '/index',
      name: 'index',
      component: index,
      children: [
        {
          // 右面默认显示进入的欢迎提示
          path: 'tips',
          name: 'tips',
          component: tips
        },
        {
          // 然后切换管理路由
          path: 'manage',
          name: '管理员管理',
          component: manage,
          beforeEnter: (to, from, next) => {
            if (sessionStorage.getItem('admin') === '0') {
              next()
            } else {
              next({
                path: '/login'
              })
            }
          },
          children: [
            {
              path: 'adminManage',
              name: 'adminManage',
              component: adminManage
            }, {
              path: '',
              redirect: 'adminManage'
            }
          ]
        },
        {
          // 然后切换管理路由
          path: 'admin',
          name: '项目管理',
          component: manage,
          children: [
            {
              path: 'banner',
              name: 'banner',
              component: banner
            },
            {
              path: 'teacher',
              name: 'teacher',
              component: teacher
            },
            {
              path: 'water',
              name: 'water',
              component: water
            },
            {
              path: 'repair',
              name: 'repair',
              component: repair
            },
            {
              path: 'home',
              name: 'home',
              component: home
            },
            {
              path: 'pass',
              name: 'pass',
              component: pass
            },
            {
              path: '',
              redirect: 'banner'
            }
          ]
        },
        {
          path: '',
          redirect: 'tips'
        }
      ]
    },
    {
      path: '*',
      redirect: 'login'
    }
  ]
})
