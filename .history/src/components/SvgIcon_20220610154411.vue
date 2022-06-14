<script lang="tsx">
import { defineComponent } from "vue"

export default defineComponent({
  props: {
    iconName: { type: String, default: '' },
    className: { type: String, default: '' },
    width: { type: String, default: '1em' },
    height: { type: String, default: '1em' },
    fill: { type: String, default: 'currentColor' },
  },
  setup(props) {
    return () => (
      <svg class={props.className} width={props.width} height={props.height} fill={props.fill}>
        <use xlinkHref={`#svg-${props.iconName}`}></use>
      </svg>
    )
  }
})
</script>