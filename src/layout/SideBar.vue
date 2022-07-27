<script setup lang="tsx">
// tsx不会需要手动导入
import 'element-plus/es/components/menu/style/css'
import 'element-plus/es/components/menu-item/style/css'
import 'element-plus/es/components/sub-menu/style/css'
import { ref, h, watch, inject, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { resolve } from 'pathe' // path包es代码实现
import Scrollbar from '../components/Scrollbar.vue'
import { RouterLink } from 'vue-router'
import type { Component, Slots } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { ElMenu, ElMenuItem, ElSubMenu, ElIcon } from 'element-plus/es'
import SvgIcon from '../components/SvgIcon.vue'
import type { Layout } from 'types/layout'

const router = useRouter()
const route = useRoute()
const defaultActive = ref<string>(route.path) // 菜单默认选中项
const defaultOpeneds = ref<string[]>(
  router.getRoutes()
    .filter(matchedRoute => matchedRoute.children.length > 0 && /^\/\w+?$/.test(matchedRoute.path))
    .map(matchedRoute => matchedRoute.path)
) // 子菜单默认展开项

const sidebarRelated = inject<Layout.SidebarRelated>('sidebarRelated')
const keepAlivePages = inject<Layout.keepAlivePages>('keepAlivePages')
const routesList = computed(() => {
  return router.options.routes
})

watch(() => route.path, () => {
  defaultActive.value = route.path
  // 如果该路由设置页面缓存则推进缓存组
  if (route.meta.keepAlive && !keepAlivePages?.has(route.name as string)) {
    keepAlivePages?.add(route.name as string)
  }
})

const getNavIcon = (item: RouteMeta | undefined) => {
  if (!item || (item && !item.icon)) return null
  return (
    <ElIcon size="0.9rem" style="margin-right: 10px; padding: 0.5rem; border-radius: 0.3rem; box-shadow: 0 1.25rem 1.68rem #0000000d; width: auto; height: auto;">
      {typeof item.icon === 'string' ? <SvgIcon iconName={item.icon as string} /> : h(item?.icon as Component)}
    </ElIcon>
  )
}

const MenuItemLink = (props: { route: RouteRecordRaw, url: string }, { slots }: { slots: Slots }) => {
  if (props.route.meta?.external) {
    return <a href={props.route.redirect as string} target='_blank' ref='noopener noreferrer'>{slots.default?.()}</a>
  }
  return <RouterLink to={props.url}>{slots.default?.()}</RouterLink>
}

const MenuItemNav = (props: { route: RouteRecordRaw, basePath: string }) => {
  // 子菜单模板
  const subMenuTemplate = (route: RouteRecordRaw) => {
    const slots = {
      title: () => (
        <>
          {getNavIcon(route.meta)}
          <span>{route.meta?.title}</span>
        </>
      )
    }
    const basePath = resolve(props.basePath, route.path)
    return (
      <ElSubMenu index={basePath} v-slots={slots}>
        {route.children?.map(item => <MenuItemNav route={item} basePath={basePath}></MenuItemNav>)}
      </ElSubMenu>
    )
  }
  // 菜单项模板
  const menuItemTemplate = (route: RouteRecordRaw) => {
    const slots = {
      title: () => (
        <span>{route.meta?.title}</span>
      )
    }
    const url = resolve(props.basePath, route.path)
    return (
      <MenuItemLink route={route} url={url}>
        <ElMenuItem index={url} v-slots={slots}>
          {getNavIcon(route.meta)}
        </ElMenuItem>
      </MenuItemLink>
    )
  }
  return props.route.meta?.hidden ? <div style="display: none"></div> :
    props.route.children && props.route.children.filter((route: RouteRecordRaw) => !route.meta?.hidden).length > 0 ?
      props.route.children.filter((route: RouteRecordRaw) => !route.meta?.hidden).length > 1 ?
        subMenuTemplate(props.route) :
        menuItemTemplate(getOnlyChildPath(props.route)) :
      menuItemTemplate(props.route)
}

function getOnlyChildPath(parentRoute: RouteRecordRaw): RouteRecordRaw {
  const childRoute = parentRoute.children?.find((route: RouteRecordRaw) => !route.meta?.hidden)
  return Object.assign({}, childRoute, { path: `${parentRoute.path}/${childRoute?.path}` } as RouteRecordRaw)
}
</script>

<template>
  <Scrollbar :speed="3">
    <ElMenu class="menu-vertical" mode="vertical" :collapse="sidebarRelated?.collapsed" :defaultActive="defaultActive"
      :defaultOpeneds="defaultOpeneds" :collapseTransition="false">
      <template v-for="route in routesList" key="index">
        <MenuItemNav :route="route" :basePath="route.path"></MenuItemNav>
      </template>
    </ElMenu>
  </Scrollbar>
</template>

<style lang="postcss">
.menu-vertical {
  width: v-bind('sidebarRelated?.collapsedWidth') !important;
}

.menu-vertical:not(.el-menu--collapse) {
  width: v-bind('sidebarRelated?.width') !important;
  padding-left: calc(var(--el-menu-expand-base-level-padding) + var(--el-menu-level) * var(--el-menu-level-padding));
  padding-right: 1rem;
}
</style>
