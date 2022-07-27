<script setup lang="ts">
import { inject, nextTick, onBeforeMount, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Close, RefreshLeft } from '@element-plus/icons-vue'
import Scrollbar from '@/components/Scrollbar.vue'
import MenuPanel from '@/components/MenuPanel.vue'
import type { ComponentPublicInstance } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { Layout } from 'types/layout'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const route = useRoute()
const tabs = ref<RouteLocationNormalizedLoaded[]>([])
const scrollbarDom = ref<InstanceType<typeof Scrollbar>>()
const menuPanelDom = ref<InstanceType<typeof MenuPanel>>()
const tabDoms = ref<ComponentPublicInstance[]>([])
const keepAlivePages = inject<Layout.keepAlivePages>('keepAlivePages')
const props = withDefaults(defineProps<{
  withIcons?: boolean
}>(), {
  withIcons: false
})

onBeforeMount(() => { addTab() })

watch(() => route.path, addTab)

function addTab() {
  const tab: RouteLocationNormalizedLoaded = route
  if (tab.meta?.hiddenTab) return
  if (tabs.value.every(route => route.path !== tab.path)) {
    /**
     * 参数传进来的meta是递归合并后的结果，此处需要找出属于该路由的meta
     * 详情见：https://router.vuejs.org/zh/guide/advanced/meta.html
     */
    tabs.value.push({ ...tab, meta: tab.matched.find(item => item.path === tab.path)?.meta || tab.meta })
  }
  nextTick(() => {
    scrollbarDom.value && tabDoms.value && moveToTab(tab)
  })
}

let lastTabIndex = 0 // 记录上一次标签索引，用于计算与新标签的位置信息
function moveToTab(tab: RouteLocationNormalizedLoaded) {
  const tabIndex = tabs.value.findIndex(item => item.path === tab.path)
  if (tabIndex === lastTabIndex) return
  const tabDom = tabDoms.value?.[tabIndex]
  const { offsetWidth, offsetLeft } = tabDom.$el
  const scrollbarState = scrollbarDom.value?.scrollbar?.getState()

  scrollbarDom.value?.scrollbar?.scroll({
    x: lastTabIndex < tabIndex ?
      (offsetLeft + offsetWidth) < (scrollbarState?.viewportSize.width || 0) ?
        null :
        offsetLeft :
      offsetLeft < (scrollbarState?.overflowAmount.x || 0) ?
        offsetLeft :
        null
  }, 150)
  lastTabIndex = tabIndex
}

function deleteKeepAlivePage(page: RouteLocationNormalizedLoaded) {
  if (keepAlivePages?.has(page.name as string)) {
    keepAlivePages.delete(page.name as string)
  }
}

function refreshPage(page: RouteLocationNormalizedLoaded) {
  deleteKeepAlivePage(page)
  router.replace({ path: `/redirect${page.path}`, query: page.query })
}

async function closeTab(tab: RouteLocationNormalizedLoaded) {
  if (tab.meta.askBeforeCloseTab) {
    const isClose = await askBeforeCloseTab(tab)
    if (!isClose) return
  }
  deleteKeepAlivePage(tab)
  const closePath = tab.path
  tabs.value.splice(tabs.value.findIndex(item => item.path === closePath), 1)
  if (tabs.value.length > 0) {
    if (closePath === route.path) {
      const nextTab = tabs.value[tabs.value.length - 1]
      const { path, query } = nextTab
      router.replace({ path, query })
    }
  } else {
    router.replace('/redirect/dashboard')
  }
}

function askBeforeCloseTab(tab: RouteLocationNormalizedLoaded) {
  return new Promise((resolve) => {
    ElMessageBox.confirm(`确定关闭页面「${tab.meta.title}」吗？`, '关闭提示', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      resolve(true)
    }).catch(() => {
      resolve(false)
    })
  })
}

function closeAllTabs() {
  keepAlivePages?.clear()
  tabs.value = []
  router.replace('/redirect/dashboard')
}

function closeOtherTabs(saveTab: RouteLocationNormalizedLoaded) {
  if (saveTab.path !== route.path) {
    router.replace({ path: '/redirect' + saveTab.path, query: saveTab.query })
  }
  for (let i = tabs.value.length - 1; i >= 0; i--) {
    const tab = tabs.value[i]
    if (tab.path === saveTab.path) continue
    deleteKeepAlivePage(tab)
    tabs.value.splice(i, 1)
  }
}

function showTabMenu(e: MouseEvent, tab: RouteLocationNormalizedLoaded) {
  // 获取位置信息
  const { clientX, clientY } = e
  if (!menuPanelDom.value) return
  menuPanelDom.value.hidePanel()
  menuPanelDom.value.setContext(tab)
  menuPanelDom.value.setPosition(clientX, clientY)
  menuPanelDom.value.showPanel()
}
</script>

<template>
  <Scrollbar ref="scrollbarDom" height="2rem" direction="horizontal" :speed="3">
    <div class="tabs">
      <RouterLink ref="tabDoms" v-for="tab in tabs" :key="tab.path" :to="tab.path" class="tab shadow-sm"
        :class="{ active: tab.path === route.path }" @click.right.prevent="showTabMenu($event, tab)">
        <ElIcon v-if="props.withIcons && tab.meta.icon" size="0.8rem" color="currentColor">
          <SvgIcon v-if="typeof tab.meta.icon === 'string'" :icon-name="(tab.meta.icon as string)"></SvgIcon>
          <component v-else :is="tab.meta.icon"></component>
        </ElIcon>
        <span style="margin: 0 5px">{{ tab.meta.title || '无标题' }}</span>
        <ElIcon class="icon-tab-close" @click.prevent="closeTab(tab)">
          <Close />
        </ElIcon>
      </RouterLink>
    </div>
  </Scrollbar>
  <MenuPanel ref="menuPanelDom">
    <ElButton text plain @click="refreshPage(menuPanelDom?.getContext())">
      <ElIcon>
        <RefreshLeft />
      </ElIcon>
      <span>刷新</span>
    </ElButton>
    <ElButton text plain @click="closeTab(menuPanelDom?.getContext())">
      <ElIcon>
        <Close />
      </ElIcon>
      <span>关闭</span>
    </ElButton>
    <ElButton text plain @click="closeOtherTabs(menuPanelDom?.getContext())">
      <ElIcon>
        <Close />
      </ElIcon>
      <span>关闭其他</span>
    </ElButton>
    <ElButton text plain @click="closeAllTabs()">
      <ElIcon>
        <Close />
      </ElIcon>
      <span>关闭所有</span>
    </ElButton>
  </MenuPanel>
</template>

<style scoped lang="postcss">
.tabs {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  font-size: 0.7rem;

  & .tab {
    height: 1.6rem;
    padding: 0 0.5rem;
    margin-right: 0.5rem;
    white-space: nowrap;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    flex-shrink: 0;
    background-color: #f1f1f1;
    background-color: var(--white);
    color: var(--black);
    border-radius: 0.5rem;

    &.active {
      background-color: var(--blue);
      color: var(--white);
    }

    &:hover:not(&.active) {
      background-color: var(--light-blue);
      color: var(--black);
    }

    & .icon-tab-close {
      &:hover {
        background-color: #666;
        color: #fff;
        border-radius: 50%;
      }
    }
  }
}
</style>