import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { getServerVersion } from '@/api/version'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }

  // 获取前端和后端的版本号在控制台打印
  const version = require('./../package.json').version
  console.log(`当前前端版本号: V${version}`)
  getServerVersion()
    .then(res => {
      if (res.code === 0) {
        console.log(`当前服务端版本为: V${res.data.version}`)
      }
    })
    .catch(error => {
      console.error('获取服务端版本失败:', error)
    })
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
