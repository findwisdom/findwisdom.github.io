---
layout: post
title:  "Markdown语法：mddir工具自动生成文件目录结构"
date:   2020-01-08 10:46:05
categories: 工具
tags: mddir 
author: wisdom
---

* content
{:toc}

mddir是个能帮助我们快速生成markdown语法形式的文件目录结构的工具，详细说明请参考官方文档

[官方文档](https://www.npmjs.com/package/mddir) 



### (一) 安装mddir工具

要安装mddir工具，必须先安装npm包管理工具。我的npm包管理工具是在安装node时自动安装的

```
    npm install mddir -g
```



### (二) 使用mddir工具

利用命令行进入对应文件夹，然后输入并执行mddir命令。

```
     mddir
```
最终在对应文件夹内会生成一个directoryList.md文件：

第一行出现的’undefined’用父文件夹名，输入代替即可。

注意，上图内容还是纯文本内容，markdown解析器解析渲染之后并不会正确显示，

而是需要像markdown中的代码块一样用两个三重反引号(```)包围起来，最终结果如下所示：

```

|-- 对应文件夹
    |-- .browserslistrc
    |-- .editorconfig
    |-- .env.cloudDev
    |-- .env.cloudMine
    |-- .env.cloudPro
    |-- .env.cloudTest
    |-- .env.private.development
    |-- .env.private.production
    |-- .env.private.test
    |-- .env.public.development
    |-- .env.public.production
    |-- .env.public.test
    |-- .eslintrc.js
    |-- .gitignore
    |-- .npmignore
    |-- .npmrc
    |-- .prettierrc.js
    |-- babel.config.js
    |-- package-lock.json
    |-- package.json
    |-- plopfile.js
    |-- postcss.config.js
    |-- README.md
    |-- vue.config.js
    |-- .idea
    |   |-- $PRODUCT_WORKSPACE_FILE$
    |   |-- misc.xml
    |   |-- modules.xml
    |   |-- scaffold-ui.iml
    |   |-- vcs.xml
    |   |-- workspace.xml
    |   |-- inspectionProfiles
    |       |-- Project_Default.xml
    |-- docs
    |   |-- css-module.md
    |   |-- scaffold.md
    |-- plop-templates
    |   |-- view
    |       |-- dialog.hbs
    |       |-- index.hbs
    |       |-- service.hbs
    |       |-- validations.hbs
    |-- public
    |   |-- favicon.ico
    |   |-- index.html
    |-- src
        |-- App.vue
        |-- main.js
        |-- permission.js
        |-- assets
        |   |-- logo.png
        |   |-- 404_images
        |   |   |-- 404.png
        |   |   |-- 404_cloud.png
        |   |-- svg
        |   |   |-- icon-wring.svg
        |   |   |-- logo.svg
        |   |   |-- nav-home.svg
        |   |   |-- nav-point.svg
        |   |   |-- nav-theme.svg
        |   |   |-- nav-usage.svg
        |   |   |-- park.svg
        |   |-- usage
        |       |-- carbon-css-module.png
        |       |-- carbon-scaffold.png
        |-- components
        |   |-- SvgIcon.vue
        |   |-- app
        |   |   |-- AppBreadcrumb.vue
        |   |   |-- AppDialog.vue
        |   |   |-- AppFooter.vue
        |   |   |-- AppHeader.vue
        |   |   |-- AppAside
        |   |       |-- index.vue
        |   |       |-- Link.vue
        |   |       |-- SidebarItem.vue
        |   |-- dialog
        |   |   |-- plop.vue
        |   |-- layout
        |   |   |-- AppLayout.vue
        |   |   |-- ContainerLayout.vue
        |   |-- table
        |       |-- TableDelete.vue
        |       |-- TableFooter.vue
        |       |-- TableHeader.vue
        |-- plugins
        |   |-- common-register
        |   |   |-- index.js
        |   |-- css-module
        |   |   |-- class-context.js
        |   |   |-- class-props.js
        |   |   |-- index.js
        |   |   |-- utils.js
        |   |-- isyscore-ui
        |   |   |-- index.js
        |   |-- vue-life
        |       |-- index.js
        |-- router
        |   |-- index.js
        |   |-- routerRoles.js
        |   |-- routes.js
        |-- services
        |   |-- plop.js
        |   |-- todo.js
        |   |-- user.js
        |-- store
        |   |-- getters.js
        |   |-- index.js
        |   |-- mutations.js
        |   |-- state.js
        |   |-- types.js
        |-- styles
        |   |-- color.css
        |   |-- color.scss
        |   |-- flex.css
        |   |-- flex.scss
        |   |-- offset.css
        |   |-- offset.scss
        |   |-- reset.css
        |   |-- reset.scss
        |   |-- text.css
        |   |-- text.scss
        |   |-- _variables.scss
        |-- utils
        |   |-- baseValidate.js
        |   |-- loading.js
        |   |-- message.js
        |   |-- number.js
        |   |-- object.js
        |   |-- querystring.js
        |   |-- service.js
        |   |-- throttle.js
        |   |-- typeis.js
        |   |-- validators.js
        |-- validations
        |   |-- plop.js
        |-- views
            |-- 404.vue
            |-- Home.vue
            |-- Login.vue
            |-- plop.vue
```




