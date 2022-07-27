import { createRouter, createWebHashHistory } from "vue-router"
import Layout from '@/layout/index.vue'
import { Link, HomeFilled, Connection } from '@element-plus/icons-vue'
import { markRaw } from "vue"
import type { RouteRecordRaw } from 'vue-router'

export const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { title: '首页', icon: HomeFilled }
    }
  ]
}

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true, title: '页面跳转', hiddenTab: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect.vue')
      }
    ]
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
    meta: { hidden: true, title: '404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    meta: { hidden: true },
  }
]

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true, title: '登录' }
  },
  {
    path: '/modal',
    name: 'Modal',
    component: Layout,
    redirect: '/modal/index',
    meta: { breadcrumb: false },
    children: [
      {
        path: 'index',
        name: 'ModalIndex',
        component: () => import('@/views/modal.vue'),
        meta: { title: '模态框', icon: Connection, askBeforeCloseTab: true }
      }
    ]
  },
  {
    path: '/https://github.com/1esse/vue-clownfish-admin-elem',
    component: undefined,
    redirect: 'https://github.com/1esse/vue-clownfish-admin-elem',
    meta: { title: 'github', external: true, icon: Link }
  }
]

function markRawWrap(routes: RouteRecordRaw[]) {
  routes.forEach(route => {
    if (route.meta?.icon && typeof route.meta.icon !== 'string') {
      route.meta.icon = markRaw(route.meta.icon)
    }
    if (route.children && route.children.length > 0) {
      markRawWrap(route.children)
    }
  })
  return routes
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: markRawWrap([dashboardRoute, ...routes, ...constantRoutes])
})

export default router