---
layout: post
title:  "Git 仓库迁移"
date:   2019-06-4 17:35:05
categories:  git
tags: git
author: wisdom
---

* content
{:toc}

最近迁移git 项目地址。

想保留原有分支和提交

网上搜索了好多步骤都很繁琐。最后发现了最优的解决方案。




### (一) 如何迁移git项目地址：


1.先克隆老项目的镜像

```
    git clone --mirror old.git // old.git 为老项目的git地址
```

2.进入老项目的目录

```
    cd old.git
```

3.移除老项目的地址替换成新项目


```
    git remote set-url --push origin  new.git  //new.git 为新项目的git地址
```

4.将镜像推到远程

```
    git push --mirror  // 这一步需要输入新的git的账号和密码
```

四步就搞定了。



   
