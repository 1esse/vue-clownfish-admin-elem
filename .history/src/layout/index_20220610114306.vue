<script setup lang="ts">
import SideBar from './SideBar.vue'
</script>
<template>
  <ElContainer>
    <ElHeader>Header</ElHeader>
    <ElContainer>
      <ElAside width="200px">
        <SideBar></SideBar>
      </ElAside>
      <ElMain>Main</ElMain>
    </ElContainer>
  </ElContainer>
</template>