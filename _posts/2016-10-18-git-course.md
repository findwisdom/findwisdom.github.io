---
layout: post
title:  "Git 只要三分钟"
date:   2016-10-18 08:35:05
categories: git
tags:  git
author: wisdom
---

* content
{:toc}

本文为git快速入门的教程，也可以说是常用命令的参考书，列举了使用git的常用命令，当然如果你对git有所了解那就更好了。





初识git时候感觉一脸懵逼，但后来发现其实不然，常见的套路也就是那些，这篇文章给大家分享一些自己常用Git的常用命令。

### 入门

#### 1.创建本地仓库

使用Git前，需要先建立一个仓库(repository)。可以使用一个已经存在的目录作为Git仓库或创建一个空目录。使用您当前目录作为Git仓库，我们只需使它初始化。

    $ git init

使用我们指定目录作为Git仓库。

    $ git init newrepo

是不是很简单，那就继续往下看吧。

从现在开始，我们将假设您在Git仓库根目录下，除非另有说明。

#### 2.添加新文件

我们有一个仓库，但什么也没有，可以使用add命令添加文件。

    $ git add filename

可以使用add... 继续添加任务文件。

#### 3.提交版本

现在我们已经添加了这些文件，我们希望它们能够真正被保存在Git仓库。为此，我们将它们提交到仓库。

    $ git commit -m "Adding files"

如果您不使用-m，会出现编辑器来让你写自己的注释信息。

当我们修改了很多文件，而不想每一个都add，想commit自动来提交本地修改，我们可以使用-a标识。

    $ git commit -a -m "Changed some files"

git commit 命令的-a选项可将所有`被修改或者已删除的且已经被git管理的文档`提交到仓库中。

_千万注意，-a不会造成新文件被提交，只能修改。_

#### 4.发布版本

我们先从服务器克隆一个库并上传

    $ git clone ssh://example.com/~/www/project.git

现在我们修改之后可以进行推送到服务器。

    $ git push ssh://example.com/~/www/project.git

#### 5.取回更新

如果已经按上面的进行push，下面命令表示，当前分支自动与唯一一个追踪分支进行合并。

    $ git pull

从非默认位置更新到指定的url。

    $ git pull http://git.example.com/project.git

好了说道这里我相信你已经有了大概的了解了吧，当然我觉得你不会是三分钟的快抢手那就接着往下看吧。

### 好快啊有分钟了么？

#### 删除

如何你想从资源库中删除文件，我们使用rm。

    $ git rm file

#### 分支与合并

分支在本地完成，速度快。要创建一个新的分支，我们使用branch命令。

    $ git branch test

第一个分支，或主分支，被称为"master"。

    $ git checkout master

对其他分支的更改不会反映在主分支上。如果想将更改提交到主分支，则需切换回master分支，然后使用合并。

    $ git checkout master
    $ git merge test

如果您想删除分支，我们使用-d标识。

    $ git branch -d test

### 分享

能告诉大家的东西大概的东西就是这些了，如果想对Git有进一步的了解可以学习以下教程：

* [Github 简明教程](http://www.runoob.com/w3cnote/git-guide.html)

* [菜鸟--Git教程](http://www.runoob.com/git/git-tutorial.html)