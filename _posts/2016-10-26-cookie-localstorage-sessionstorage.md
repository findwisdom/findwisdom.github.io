---
layout: post
title:  "cookie localstorage 与 sessionstorage 的比较"
date:   2016-10-26 12:35:05
categories: cookie localstorage sessionstorage HTML5
tags: note
author: wisdom
---

* content
{:toc}

本文主要描述了cookie localstorage 与 sessionstorage 的比较，以及他们的应用场景。





### 简要分析cookie、localstorage、sessionstorage区别：

#### Cookie

Cookie 是小甜饼的意思。顾名思义，cookie 确实非常小，它的大小限制为4KB左右。它的主要用途有保存登录信息，比如你登录某个网站市场可以看到“记住密码”。


#### localStorage

`localStorage` 是 HTML5 标准中新加入的技术，它并不是什么划时代的新东西。早在 IE 6 时代，就有一个叫 `userData` 的东西用于本地存储。而如今，`localStorage` 被大多数浏览器所支持（尤其在这个移动互联网时代）。

#### sessionStorage

`sessionStorage` 与 `localStorage` 的接口类似，但保存数据的生命周期与 `localStorage` 不同。做过后端开发的同学应该知道 `Session` 这个词的意思，直译过来是“会话”。而 `essionStorage` 是一个前端的概念，它只是可以将一部分数据在当前会话中保存下来，刷新页面数据依旧存在。但当页面关闭后，`sessionStorage` 中的数据就会被清空。

#### 三者的异同

| 特性          | cookie           | localStorage  |sessionStorage                                 |
| ------------- |:-------------   :| -----:                                         |     -----:   |
| 数据的生命期  | 可设置失效时间，默认是关闭浏览器后失效 | 除非被清除，否则永久保存 |仅在当前会话下有效，关闭页面或浏览器后被清除|
| ------------- |:-------------   :                                                     | -------------------------:   |
| 存放数据大小     | 4K左右     |   	一般为5MB|
| 与服务器端通信	 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 |仅在客户端（即浏览器）中保存，不参与和服务器的通信 |
| 易用性	 |需要程序员自己封装，源生的Cookie接口不友好   |源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 |

#### 应用场景

有了对上面这些差别的直观理解，我们就可以讨论三者的应用场景了。

##### cookie

因为考虑到每个 `HTTP 请求`都会带着 `Cookie` 的信息，所以 `Cookie` 当然是能精简就精简啦，比较常用的一个应用场景就是判断用户是否登录。

##### localStorage

`localStorage` 接替了 `Cookie` 管理购物车的工作，同时也能胜任其他一些工作。比如HTML5游戏通常会产生一些本地数据，`localStorage` 也是非常适用的(在移动开发尽量使用localStorage)。

##### sessionStorage

如果遇到一些内容特别多的表单，为了优化用户体验，我们可能要把表单页面拆分成多个子页面，然后按步骤引导用户填写。这时候 `sessionStorage` 的作用就发挥出来了。

本文大多数内容来自[朝康博客](http://yuchaocai.com/?post=22)在此鸣谢。