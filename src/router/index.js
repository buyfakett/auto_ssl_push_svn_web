import Vue from 'vue'
import Router from 'vue-router'
/* Layout */
import Layout from '@/layout'

Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/manage/ssl',
    children: [
      {
        path: '仪表板',
        component: () => import('@/views/dashboard/index'),
        name: '仪表板',
        meta: {title: '仪表板', icon: 'dashboard', affix: true}
      }
    ]
  },

  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/ssl',
    name: 'ssl证书管理系统',
    meta: {
      title: 'ssl证书管理系统',
      icon: 'table'
    },
    children: [
      {
        path: 'domain',
        component: () => import('@/views/manage/domain/index'),
        name: '主域名配置',
        meta: { title: '主域名配置' }
      },
      {
        path: 'server',
        component: () => import('@/views/manage/server/index'),
        name: '服务器',
        meta: { title: '服务器' }
      },
      {
        path: 'ssl',
        component: () => import('@/views/manage/ssl/index'),
        name: '证书',
        meta: { title: '证书' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
