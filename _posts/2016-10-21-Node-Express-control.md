---
layout: post
title:  "Express学习（二）-- 掌控你的 Express 项目"
date:   2016-10-21 20:35:05
categories: Node Express
tags:  Node Express note
author: wisdom
---

* content
{:toc}

本文为《Node与Express开发》第三章的读书笔记，记录了自己在学习Node与Express时所遇到的一些问题，加入了自己的一些见解。





### 成就完美

《Node与Express开发》第四章开篇扯了一些题外话，但却成功的打动了我，就此希望能和大家分享一下。

面_“快速”_ _“低廉”_ _“优质”_ 三个选项，你总是只能任选其中两个。这个模型总会困扰我，因为它没考虑正确做事的_累计价值_。

你第一次正确做事所用的时间可能是你马马虎虎迅速做事所需时间的 5 倍。然而第二次将只需要 3 倍的时间。等你做过很多次后，正确做事的速度几乎能与马马虎虎迅速做事一样了。

熟并不能生巧：熟练的能变成永久不变的。如果按照坏习惯练习，坏习惯就变成机械式的了。

所以应该遵循完美的规则去练习，这样才能成就完美。


### 版本控制

版本控制的价值萌新不予评论，但我想大家都因该知道它的重要性，同书中所使用的版本工具一样，我也喜欢使用git作为项目的版本控制工具，下面的的演示都将会以`git`为例

#### 1.安装git

要想使用git首先确保已经安装了 Git。输入 git --version ，如果没有输出版本号，那你还需要安装一下 Git。请参见[ Git 文档]（http://git-scm.com/）中的安装指南

#### 2.管理git仓库

首先，进入项目目录并创建一个 Git 存储库：

    $ git init

在添加这些文件之前，需要创建一个 .gitignore 文件，以防不慎把不想添加的东西加进去。在项目目录中创建一个文本文件 .gitignore，可以把任何想让 git 默认忽略的文件或目录写在该文件里（每个一行）。

`.gitignore`文件还支持，通配符如果你用的是Mac，应该还要在这个文件里加入 .DS_Store ，还有 node_modules.

`.gitignore`这个文件看起来可能是这样的：

    node_modules
    *~
    .DS_Store

我们可以把所有已有的文件都加到 Git 里，这有很多种做法。我一般使用：

    $ git add -a

如果只想提交一两个文件如添加`meadowlark.js`那么可以使用:

    $ git add meadowlark.js

逐个添加你想要的文件，注意：` git add 命令,它添加的是修改 `，如果你修改过 `meadowlark.js`，然后输入 `git add meadowlark.js `，真正所做的是把刚刚做过的修改添加了进来。

`Git`有一个“暂存区”，当你执行 git add 时，这些修改就被存放在该区域中。

要提交这些修改需使用 git commit ：

    git commit -m "Initial commit."

`-m "Initial commit." `是写一条与这次提交相关的消息。Git 不允许没有消息的提交，当然我认为这种要求是很有道理的。

当然我们还可以把它放到官方库中储存只要`clone`一下,在'push'就可以了：

    $ git clone https://github.com/EthanRBrown/web-development-with-node-and-express

    $ git push https://github.com/EthanRBrown/web-development-with-node-and-express

### npm包

项目所依赖的 npm 包放在 `node_modules` 目录下，但永远不要修改这个目录中的任何代码。这是因为那不仅是不良的行为，而且你所做的修改很可能轻易地就被 npm 消除了。

package.json 文件有双重作用：描述项目和列出依赖项。建好项目后你会看到：

    {
        "dependencies": {
            "express": "^4.0.0",
            "express3-handlebars": "^0.5.0"
        }
    }

现在我们的 package.json 文件里只有与依赖项相关的信息。注意包版本号之前的插入符（^），这表明在下一个主要版本号之前，所有以指定版本号开始的版本都能用。

`package.json` 文件中列出了所有的依赖项，所以说 node_modules 目录实际上是个衍生品。

如果你把它删了，要让项目重新恢复工作，只需运行:

    $ npm install

便会重建这个目录，并把所有必需的依赖项全放进去。

所以不管什么时候在项目中使用了` Node `模块，你都要确保它作为依赖项出现在` package.json `文件中。

### 项目元数据

`package.json` 文件的另一个作用便是存放项目的元数据，项目名称、作者、授权信息等。如果你用 npm init 来初始化创建 package.json 文件，它会为你生成必需的域，然后你可以随时修改它们。

如果你想了解更多有关`package.json` 中各个域的信息，请查阅 [package.json文档](https://www.npmjs.org/doc/files/package.json.html)。

另一个重要的元数据是 `README.md`文件。这个文件很适合描述网站的整体架构，也适合于存放刚接触项目的人需要了解的重要信息。这个文件是用基于 `Markdown` 的文本维基格式写成的。

如果想了解更多的话可以查阅[markdown文档](http://daringfireball.net/projects/markdown/)。

### Node模块

Node 模块和 npm 包是两个相互关联但又彼此不同的概念。Node 模块，就像它的名字一样，提供了一个模块化和封装的机制。npm 包则提供了一种存储、版本化和引用项目（不限于模块）的标准范式。

比如，我们在主程序文件中将 Express 作为一个模块引入：

    var express = require('express');

require 是一个用来引入模块的 Node 函数。Node 默认会在目录 node_modules中寻找这些模块。然而 Node 还提供了创建自有模块的机制（你永远不要在 node_modules 中创建自己的模块）。

接下来，我们将上次实现的幸运饼干功能模块化。

首先，我们创建一个用来保存模块的目录。名字随意，但一般都称为 lib（library 的缩写）。

在这个目录下创建一个`fortune.js` 文件：

    var fortuneCookies = [
        "Conquer your fears or they will conquer you.",
        "Rivers need springs.",
        "Do not fear what you don't know.",
        "You will have a pleasant surprise.",
        "Whenever possible, keep it simple.",
    ];
    exports.getFortune = function() {
        var idx = Math.floor(Math.random() * fortuneCookies.length);
        return fortuneCookies[idx];
    };

这里要特别注意全局变量输出的用法。如果你想让一个东西在模块外可见，必须把它加到exports 上。在这个例子中，在模块外可以访问到函数 `getFortune` ，但数组 `fortuneCookies`是完全隐藏起来的。这是一件好事，因为封装可以减少容易出错和较脆弱的代码。

我们现在可以从` meadowlark.js` 中移除 fortuneCookies 数组,在` meadowlark.js` 文件的顶部加上下面这行代码：

    var fortune = require('./lib/fortune.js');

在模块名称前加了前缀 ``./ `这是告诉 Node，它不应该到 `node_modules` 目录中查找这个模块，如果我们忽略了这个前缀就会导致失败。

接下来在关于页面的路由中，我们可以利用以上模块里的 `getFortune`方法：

    app.get('/about', function(req, res) {
        res.render('about', { fortune: fortune.getFortune() } );
    });

如果你一直在按照步骤操作，现在可以提交这些修改了：

    $ git add -A
    $ git commit -m "Moved 'fortune cookie' functionality into module."

在push你的仓库那么就完美无缺了。

### 总结

* 使用版本控制工具

* 看似简单的数据元信息有改变世界的力量

* 使用 `package.json` 去描述我们的依赖包，已被以后管理和使用

* 将你想要的功能模块化

《Node与Express开发》的第四章虽然没有阐述太多高深的开发技巧，却带领我们建立了宏观的项目思维，给了一脸懵逼的我很大的启发。



