<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

const locale = zhCn
</script>
<template>
  <el-config-provider :locale="locale">
    <RouterView />
  </el-config-provider>
</template>