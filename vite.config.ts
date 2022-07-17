import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import path from 'path'
import postcssNesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'
import flexbugsFixes from 'postcss-flexbugs-fixes'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

function resolvePath(src: string) {
  return path.resolve(__dirname, src)
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [resolvePath('src/svgs')],
      symbolId: 'svg-[dir]-[name]',
    }),
    Components({
      resolvers: [
        ElementPlusResolver()
      ]
    })
  ],
  css: {
    postcss: {
      plugins: [
        postcssNesting,
        autoprefixer({
          overrideBrowserslist: [
            'Android 4.1',
            'iOS 7.1',
            'Chrome > 31',
            'ff > 31',
            'ie >= 8',
            '> 1%',
          ],
          grid: true,
        }),
        flexbugsFixes
      ]
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    open: false,
    port: 8888
  }
})
