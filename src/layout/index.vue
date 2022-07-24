<script setup lang="ts">
import { computed } from '@vue/reactivity'
import { onBeforeMount, provide, reactive, ref } from 'vue'
import HeadBar from './HeadBar.vue'
import SideBar from './SideBar.vue'
import TabsBar from './TabsBar.vue'
import isMobile from '@/composables/isMobile'
import Logo from '@/assets/logo.png'
import type { Layout } from 'types/layout'

const _isMobile = isMobile()
const sidebarRelated = reactive<Layout.SidebarRelated>({
  collapsed: true,
  width: '15rem',
  collapsedWidth: '3rem'
})
const loading = reactive<Layout.Loading>({
  logout: false
})
const keepAlivePages = ref<Layout.keepAlivePages>(new Set())
const getKeepAlivePages = computed(() => {
  return Array.from(keepAlivePages.value)
})
const asideWidth = computed(() => {
  return sidebarRelated?.collapsed ? sidebarRelated?.collapsedWidth : sidebarRelated?.width
})

onBeforeMount(() => {
  setSidebarCollapsed()
})

function setSidebarCollapsed() {
  sidebarRelated.collapsed = _isMobile.value
}

// 为子组件提供布局的相关状态信息
provide('sidebarRelated', sidebarRelated)
provide('keepAlivePages', keepAlivePages.value)
provide('loading', loading)
</script>
<template>
  <ElContainer style="height: 100%">
    <ElAside v-if="!_isMobile" :width="asideWidth">
      <div class="shadow-lg" style="display: flex; flex-direction: column; width: 100%; height: 100%;">
        <RouterLink to="/">
          <el-image :style="{ width: '100%', height: sidebarRelated.collapsed ? '3rem' : '6rem', padding: '0.3rem 0' }"
            :src="Logo" fit="contain" />
        </RouterLink>
        <SideBar></SideBar>
      </div>
    </ElAside>
    <ElContainer>
      <ElHeader>
        <HeadBar></HeadBar>
        <TabsBar :withIcons="true"></TabsBar>
      </ElHeader>
      <ElMain id="content-window">
        <RouterView v-slot="{ Component, route }">
          <Transition name="fade-scale" mode="out-in">
            <!-- 
              vite的hmr和keepalive组件冲突会导致vite热更新后路由失效，
              https://github.com/vuejs/core/pull/5165
              开发过程注释掉keepalive
            -->
            <!-- <KeepAlive :include="getKeepAlivePages"> -->
            <component :is="Component" :key="route.path" />
            <!-- </KeepAlive> -->
          </Transition>
        </RouterView>
      </ElMain>
    </ElContainer>
  </ElContainer>
  <Teleport to="body">
    <Transition name="slide-right" mode="out-in" appear>
      <Shadow v-if="_isMobile && !sidebarRelated.collapsed" @shadowClick="sidebarRelated.collapsed = true">
        <div class="block sidebar-mobile">
          <RouterLink to="/">
            <el-image
              :style="{ width: sidebarRelated.width, height: sidebarRelated.collapsed ? '3.6rem' : '6.6rem', padding: '0.3rem 0' }"
              :src="Logo" fit="contain" />
          </RouterLink>
          <SideBar style="padding-right: 1rem;"></SideBar>
        </div>
      </Shadow>
    </Transition>
  </Teleport>
</template>

<style lang="postcss" scoped>
.sidebar-mobile {
  width: v-bind('sidebarRelated.width');
  height: 96vh;
  position: absolute;
  top: 2vh;
  left: 2vw;
  padding: 0;
  display: flex;
  flex-direction: column;
}
</style>
