<p align="center">
  <img src="https://github.com/1esse/vue-clownfish-admin/blob/master/logo.png" alt="logo">
</p>
<h3 align="center">A frontend SIMPLE Admin Interfaces, based on Vite + Vue3 + ElementPlus + Typescript.</h3>
<p align="center">
  <a href="https://github.com/vuejs/core">
    <img src="https://img.shields.io/badge/vue-3.2.37-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vitejs/vite">
    <img src="https://img.shields.io/badge/vite-2.9.10-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/pinia">
    <img src="https://img.shields.io/badge/pinia-2.0.14-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/vuejs/router">
    <img src="https://img.shields.io/badge/vueRouter-4.0.15-brightgreen.svg" alt="vue">
  </a>
  <a href="https://github.com/element-plus/element-plus">
    <img src="https://img.shields.io/badge/element-plus-2.2.5-brightgreen.svg" alt="element-ui">
  </a>
  <a href="https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
  </a>
  <a href="https://github.com/1esse/vue-clownfish-admin/releases">
    <img src="https://img.shields.io/github/v/release/1esse/vue-clownfish-admin.svg" alt="GitHub release">
  </a>
</p>

English | [简体中文](https://github.com/1esse/vue-clownfish-admin-elem/blob/master/README.zh.md)

#### This is element-plus version of vue-clownfish-admin, if you prefer antd as UI toolkit, checokut [here](https://github.com/1esse/vue-clownfish-admin).

## 🐬 Intro
[vue-clownfish-admin](https://github.com/1esse/vue-clownfish-admin) is a frontend SIMPLE Admin Interfaces. It is based on vue3 and uses [element-plus](https://github.com/element-plus/element-plus) as UI toolkit. The main tech stacks are
[ES2015+](http://es6.ruanyifeng.com/)，[typescript](https://www.typescriptlang.org/zh/)，[vue3](https://staging-cn.vuejs.org)，[pinia](https://pinia.vuejs.org/)，[vue-router](https://router.vuejs.org/zh/)，[vite](https://cn.vitejs.dev/)，[element-plus](https://github.com/element-plus/element-plus). Understanding and Learning them will help you quickly use this project. Due to this project based on vite and vue3, it only support modern browsers, legacy browsers such as ie can be supported by add polyfill manually(detail see [https://vitejs.dev/guide/build.html#browser-compatibility](https://vitejs.dev/guide/build.html#browser-compatibility)).

+ [preview online](https://1esse.github.io/vue-clownfish-admin-elem)

This project is a pure project and does not integrate any case examples that is not related to this project. There are only a few codes that you may not use, which are only functional examples of this project for reference. Standing on the shoulders of giants, if you are familiar with [vue-element-admin](https://github.com/PanJiaChen/vue-element-admin), then you can get started with this project faster. The architecture implementation of [vue-clownfish-admin](https://github.com/1esse/vue-clownfish-admin) is inspired by it.

## 🦑 Advantage
+ Tech: Use the latest tech stacks of vue3.
+ Pure: No mockjs, case examples integrated, you can configure freely.
+ Layout: Layout components are decoupled, easy to use and replace it.
+ Lightweight：Less codes, easy to learn and get started quickly.

## 🐳 Features
+ Automatically generate sidebar menus based on routing configuration (supports multi-level nesting and external links)
+ Dynamically generate breadcrumbs based on current routing information
+ Navigation tabs (right-click pop-up menu, support page refresh, close)
+ Sidebar menus, breadcrumbs, and tabs all support icons (element-plus icons and svg)
+ Dynamically cache pages based on routing configuration
+ Routing permissions
+ Svg Sprite Icon
+ Automatically register global components (element-plus components and components/*.vue)
+ Support native CSS variables and CSSWG draft regulations for development, and write CSS that conforms to future standards
+ Automatically add prefixes to CSS codes to adapt styles to different browsers
+ Supports development with JSX/TSX

## 🐋 Directory
```
.
|-- public
|   `-- favicon.ico
|-- src
|   |-- assets
|   |   `-- logo.png
|   |-- components // Component directory, all vue components in this directory will be automatically registered as global components, no need to import
|   |   |-- MenuPanel.vue
|   |   |-- Scrollbar.vue
|   |   |-- SvgIcon.vue
|   |   `-- components.expose.d.ts
|   |-- composables // Composable functions directory
|   |-- layout // Layout directory
|   |   |-- BreadCrumb.vue
|   |   |-- HeadBar.vue
|   |   |-- SideBar.vue
|   |   |-- TabsBar.vue
|   |   |-- index.vue
|   |   `-- layout.d.ts
|   |-- router // Router directory
|   |   `-- index.ts
|   |-- stores // pinia store directory
|   |   |-- stores.d.ts
|   |   `-- user.ts
|   |-- styles // global styles directory
|   |   |-- _elem.postcss
|   |   |-- _transition.postcss
|   |   |-- _variables.postcss
|   |   `-- index.postcss
|   |-- svgs // Svg icon directory, all svg icon names in this directory can be directly referenced by the component SvgIcon
|   |   |-- dashboard.svg
|   |   `-- nested.svg
|   |-- utils // Utils directory
|   |   `-- index.ts
|   |-- views // Views directory
|       |-- 404.vue
|       |-- dashboard.vue
|       |-- login.vue
|       |-- redirect.vue
|   |-- App.vue
|   |-- appConfig.ts
|   |-- env.d.ts
|   |-- main.ts
|   `-- permission.ts // router guards
|-- index.html
|-- package.json
|-- components.d.ts
|-- tsconfig.json
|-- tsconfig.node.json
|-- vite.config.ts
`-- yarn.lock
|-- LICENSE
|-- README.md
```

## 🦀 Ready
    # clone project
    git clone https://github.com/1esse/vue-clownfish-admin-elem.git
    
    # enter the project directory
    cd vue-clownfish-admin-elem
    
    # install dependency
    npm install # use npm
    yarn # use yarn
    
    # start
    npm run dev # use npm
    yarn dev # use yarn

## 🐠 Scripts
+ dev：start development
+ build：build project
+ preview：preview the built project

## 🦐 Preview
[preview online](https://1esse.github.io/vue-clownfish-admin-elem)

## 🐡 Others
If you encounter any problems with the project, please submit an [issue](https://github.com/1esse/vue-clownfish-admin/issues/new).

## 🐙 License
[MIT License](https://github.com/1esse/vue-clownfish-admin/blob/master/LICENSE)

Copyright	&copy; 2022-present ZhaoJieXin
