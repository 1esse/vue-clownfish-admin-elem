import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from '@/layout/index.vue'
import { Component } from "vue"


declare module 'vue-router' {
  interface RouteMeta {
    /**
     * title：菜单名
     */
    title?: string
    /**
     * icon：菜单图标，值为src/svgs文件夹下相同的名称或者antd图标组件，当值为组件时需要显式导入
     */
    icon?: Component | string
    /**
     * external：是否外部链接，外部链接时需在redirect指定链接地址
     */
    external?: boolean
    /**
     * breadcrumb：是否显示面包屑，默认true
     */
    breadcrumb?: boolean
    /**
     * hidden：是否在菜单隐藏
     */
    hidden?: boolean
    /**
     * keepAlive：是否缓存该路由，只有当页面定义的name和路由定义的name一致时，才能生效
     */
    keepAlive?: boolean
  }
}

const dashboardRoute: RouteRecordRaw = {
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  meta: { breadcrumb: false },
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard.vue'),
      meta: { title: 'Dashboard', icon: 'dashboard' }
    }
  ]
}

const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true, title: '页面跳转' },
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

const routes: RouteRecordRaw[] = []

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [dashboardRoute, ...routes, ...constantRoutes]
})

/**
 * 动态路由的实现参考
 * 1、使用addRoute添加所有新增路由（如果不同步显示在侧边菜单，可忽略2、3步骤）
 * 2、如果要显示在侧边菜单栏，需要把所有新增路由同步添加至router.options.routes
 * 3、replace替换当前页面至/redirect页面以刷新所有新增路由
 * 详情见 https://router.vuejs.org/zh/api/#addroute-1
 * 
 * 举个栗子：
 * const newRoute: RouteRecordRaw = {
    path: '/example',
    name: 'Example',
    component: Layout,
    redirect: '/example/index',
    children: [{
      path: 'index',
      name: 'ExampleIndex',
      component: () => import('@/views/example.vue'),
      meta: { title: '新增路由', icon: 'example' },
    }]
  }
  router.addRoute(newRoute)
  router.options.routes.push(newRoute)
  router.replace('/redirect/dashboard')
 */

export default router