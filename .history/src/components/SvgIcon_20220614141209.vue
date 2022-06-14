<script lang="ts" setup>
const props = withDefaults(defineProps<{
  iconName: string
  className?: string
  width?: string
  height?: string
  fill?: string
}>(), {
  iconName: '',
  className: '',
  width: '1em',
  height: '1em',
  fill: 'currentColor'
})
</script>

<template>
  <svg :class="props.className" :width="props.width" :height="props.height" :fill="props.fill">
    <use :xlink:href="`#svg-${props.iconName}`"></use>
  </svg>
</template>