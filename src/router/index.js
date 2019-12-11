import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '../views/404.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/user',
    hiddenInMenu: true,
    component: () =>
      import(/* webpackChunkName: "user-layout" */ '../layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        redirect: 'login'
      },
      {
        path: 'login',
        name: 'login',
        component: () =>
          import(/* webpackChunkName: "login" */ '../views/User/Login.vue')
      },
      {
        path: 'register',
        name: 'register',
        component: () =>
          import(
            /* webpackChunkName: "register" */ '../views/User/Register.vue'
          )
      }
    ]
  },
  {
    path: '/dashboard',
    meta: { icon: 'dashboard', title: '仪表盘' },
    component: () =>
      import(
        /* webpackChunkName: "basic-layout" */ '../layouts/BasicLayout.vue'
      ),
    children: [
      {
        path: '',
        redirect: 'analysis'
      },
      {
        path: 'analysis',
        name: 'analysis',
        meta: { icon: 'bar-chart', title: '分析页' },
        component: () =>
          import(
            /* webpackChunkName: "analysis" */ '../views/Dashboard/Analysis.vue'
          )
      },
      {
        path: 'monitor',
        name: 'monitor',
        meta: { icon: 'line-chart', title: '监控页' },
        component: () =>
          import(
            /* webpackChunkName: "monitor" */ '../views/Dashboard/Monitor.vue'
          )
      }
    ]
  },
  {
    path: '/form',
    meta: { icon: 'form', title: '表单页' },
    component: () =>
      import(
        /* webpackChunkName: "basic-layout" */ '../layouts/BasicLayout.vue'
      ),
    children: [
      {
        path: '',
        redirect: 'basic-form'
      },
      {
        path: 'basic-form',
        name: 'basic-form',
        meta: { icon: 'right-square', title: '基础表单' },
        component: () =>
          import(
            /* webpackChunkName: "basic-form" */ '../views/Form/BasicForm.vue'
          )
      },
      {
        path: 'step-form',
        hiddenChildrenInMenu: true,
        meta: { icon: 'ordered-list', title: '分步表单' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '',
            redirect: 'info'
          },
          {
            path: 'info',
            name: 'info',
            component: () =>
              import(
                /* webpackChunkName: "step-form" */ '../views/Form/StepForm/Step1.vue'
              )
          },
          {
            path: 'confirm',
            name: 'confirm',
            component: () =>
              import(
                /* webpackChunkName: "step-form" */ '../views/Form/StepForm/Step2.vue'
              )
          },
          {
            path: 'result',
            name: 'result',
            component: () =>
              import(
                /* webpackChunkName: "step-form" */ '../views/Form/StepForm/Step3.vue'
              )
          }
        ]
      },
      {
        path: 'advanced-form',
        name: 'advanced-form',
        meta: { icon: 'align-left', title: '高级表单' },
        component: () =>
          import(
            /* webpackChunkName: "advanced-form" */ '../views/Form/AdvancedForm.vue'
          )
      }
    ]
  },
  {
    path: '/',
    name: 'home',
    hiddenInMenu: true,
    redirect: '/dashboard/analysis'
  },
  {
    path: '*',
    name: '404',
    hiddenInMenu: true,
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  next()
})

router.afterEach((to, from) => {
  if (to.path !== from.path) {
    NProgress.done()
  }
})

export default router
