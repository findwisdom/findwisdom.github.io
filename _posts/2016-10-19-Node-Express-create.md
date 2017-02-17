---
layout: post
title:  "Express学习（一）-- 创建 Express 项目"
date:   2016-10-19 21:35:05
categories: Node Express
tags:  Node Express note
author: wisdom
---

* content
{:toc}

本文为《Node与Express开发》第三章的读书笔记，记录了自己在学习Node与Express时所遇到的一些问题，加入了自己的一些见解。





### 脚手架

大多数项目都需要一定数量的“套路化”代码，对此有个简单的方法，那就是创建一个通用的项目骨架，每次开始新项目时，只需复制这个骨架，或者说是模板。

Express 借鉴了 RoR 的做法，提供了一个生成脚手架的工具。尽管 Express 有可用的脚手架工具，但其本身有一些局限性，所以我们可以创建一个属于自己的脚手架。

#### （一） 创建自己的脚手架

##### 1.创建项目根目录

这个文件为整个项目的结构性根目录。

##### 2.创建package.json-配置项目信息与依赖

作用：管理项目的依赖项以及项目的元数据。如果为以前未了解过这方面的知识可参考[菜鸟教程-npm使用介绍](http://www.runoob.com/nodejs/nodejs-npm.html)里面有较为详细的介绍。

创建方法：

    $npm init

它会问一系列的问题，然后为你生成一个 `package.json `文件帮你起步。

##### 3.安装Express模块

    $npm install --save express

运行 npm install 会把指定名称的包安装到 node_modules 目录下。如果你用了 --save 选项，它还会更新 package.json 文件。

因为 node_modules 随时都可以用 npm 重新生成，所以我们不会把这个目录保存在我们的代码库中。为了确保不把它添加到代码库中。

我们可以创建一个 .gitignore 文件：

    # ignore packages installed by npm
    node_modules
    # put any other files you don't want to check in here,
    # such as .DS_Store (OSX), *.bak, etc.

##### 4.创建入口文件

接下来创建 `meadowlark.js`文件，这是我们项目的入口,当然你也可以以自己想要的名字命名。`meadowlark.js`代码：

    var express = require('express');
    var app = express();
    app.set('port', process.env.PORT || 3000);

    // 定制 404 页面
    app.use(function(req, res){
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });

    // 定制 500 页面
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
    });

    app.listen(app.get('port'), function(){
        console.log( 'Express started on http://localhost:' +
        app.get('port') + '; press Ctrl-C to terminate.' );
    });

##### 5.启动服务器

    $node meadowlark.js

通过浏览器访问 `localhost:3000`即可访问项目网站。因为以上并为给出路由信息所以会返回一个404页面。

以上就配置出了基本的服务器角手架

##### 总结：

* 项目文件放在项目的根目录

* 通过`package.json`配置node模块的依赖

* `.gitignore`管理代码库

* 入口文件用于启动服务器

网站需要的其他功能通过这个角手架进行配置和添加

#### （二）深入入口文件

当然经过前面的操作我们的脚手架的雏形已经有了，下面我们继续配置它们，从而满足自己需要的效果。

##### 1.配置路由

给首页和关于页面加上路由，在 404 处理器之前加上两个新路由：

    app.get('/', function(req, res){
        res.type('text/plain');
        res.send('Meadowlark Travel');
    });

    app.get('/about', function(req, res){
        res.type('text/plain');
        res.send('About Meadowlark Travel');
    });

    // 定制 404 页面
    app.use(function(req, res, next){
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
    });

`app.get` 是我们添加路由的方法。在 Express 文档中写的是 `app.VERB` 。这并不意味着存在一个叫 VERB 的方法，它是用来指代 HTTP 动词的（最常见的是`“get”` 和`“post”`）。

* 这个方法有两个参数：一个路径和一个函数。路由就是由这个路径定义的。

app.VERB 帮我们做了很多工作：它默认忽略了大小写或反斜杠，并且在进行匹配时也不考虑查询字符串。所以针对关于页面的路由对于` /about、/About、/about/、/about?foo=bar、/about/?foo=bar `等路径都适用。

路由匹配上之后就会调用你提供的函数，并把请求和响应对象作为参数传给这个函数。

##### 2.请求和响应

B/S系统的基础都构建于响应与请求的基础上，浏览器发生请求到服务器，服务器处理请求并响应发送数据给浏览器，这样就构建了服务器与浏览器的通信基础。Express的基础也就是处理请求与响应对象。

路由匹配上之后就会调用你提供的函数，并把请求和响应对象作为参数传给这个函数。Express扩展了 `res`，`req`对象，扩展了一些方法。

下面的例子我们将用到一些Express扩展的方法，如：用`res.set` 和 `res.status` 替换了 Node 的 `res.writeHead` , `res.type`可以方便地设置响应头 Content-Type 。

##### 3.中间件

我们对定制的 404 和 500 页面的处理与对普通页面的处理应有所区别：用的不是`app.get` ，而是 `app.use` 。 `app.use` 是 Express 添加中间件的一种方法。

目前可以把它看作处理所有没有路由匹配路径的处理器。这里涉及一个非常重要的知识点：在 Express 中，路由和中间件的添加顺序至关重要。

如果我们把404 处理器放在所有路由上面访问这些 URL 得到的都是 404。

##### 4.路由的匹配规则（注意通配符的使用）

Express路由的路径支持通配符，路由匹配规则是由上到下执行的，这会导致顺序上的问题。比如说，如果要给关于页面添加子页面，比如 /about/contact 和 /about/directions 会怎么样呢？

请看下面带码：

    app.get('/about*',function(req,res){
    // 发送内容……
    })

    app.get('/about/contact',function(req,res){
    // 发送内容……
    })

    app.get('/about/directions',function(req,res){
    // 发送内容……
    })

本例中的` /about/contact `和 `/about/directions `处理器永远无法匹配到这些路径，因为第一个处理器的路径中用了通配符：` /about*` 。

再次启动服务器，现在首页和关于页面都可以运行了。

---

### 视图和布局

视图本质上是要发送给用户的东西。对网站而言，视图通常就是 HTML。

Express 支持多种不同的视图引擎，它们有不同层次的抽象。Express 比较偏好的视图引擎是 `Jade`，但我我较喜欢另一个抽象程度较低的模板框架`Handlebars`。(其实因为是书上推荐使用Handlebars，渣渣新人没有办法)

#### （一）视图模板的创建

为了支持 Handlebars，我们要用到` Eric Ferraiuolo `的` express3-handlebars` 包（尽管名字中是 express3，但这个包在 `Express 4.0` 中也可以使用）。

##### 1.引入设置handlebars 视图引擎

在你的项目目录下执行：

    var app = express();
    // 设置 handlebars 视图引擎
    var handlebars = require('express3-handlebars')
    .create({ defaultLayout:'main' });
    app.engine('handlebars', handlebars.engine);
    app.set('view engine', 'handlebars');

这段代码创建了一个视图引擎，并对 Express 进行了配置，将其作为默认的视图引擎。接下来创建 views 目录，在其中创建一个子目录 layouts。

##### 2.创建母版页 main.handlebars 文件

母版页 `main.handlebars` 文件:

    <!doctype html>
    <html>
        <head>
        <title>Meadowlark Travel</title>
        </head>
        <body>
            \{\{\{body\}\}\}
        </body>
    </html>

以上内容你未曾见过的可能只有`\{\{\{body\}\}\}`。这个表达式会被每个视图自己的 HTML 取代。

##### 3.创建视图页面

接下来我们给首页创建视图页面，`views/home.handlebars`：

    <h1>Welcome to Meadowlark Travel</h1>

关于页面，`views/about.handlebars`：

    <h1>About Meadowlark Travel</h1>

未找到页面，`views/404.handlebars`：

    <h1>404 - Not Found</h1>

最后是服务器错误页面，`views/500.handlebars`：

    <h1>500 - Server Error</h1>

##### 4.配置路由

现在视图已经设置好了，接下来我们必须将使用这些视图的新路由替换旧路由：

    app.get('/', function(req, res) {
    res.render('home');
    });
    app.get('/about', function(req, res) {
    res.render('about');
    });
    // 404 catch-all 处理器（中间件）
    app.use(function(req, res, next){
        res.status(404);
        res.render('404');
    });
    // 500 错误处理器（中间件）
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500);
        res.render('500');
    });

需要注意，我们已经不再指定内容类型和状态码了：视图引擎默认会返回 text/html 的内容类型和 200 的状态码。

在 catch-all 处理器（提供定制的 404 页面）以及 500 处理器中，我们必须明确设定状态码。

再次启动服务器检查首页和关于页面，将会看到那些视图已呈现出来。检查源码，将会看到 `views/layouts/main.handlebars` 中的套路化 HTML。

#### （二）视图和静态文件

Express 靠中间件处理静态文件和视图，`static` 中间件可以将一个或多个目录指派为包含静态资源的目录，其中的资源不经过任何特殊处理直接发送到客户端。

在项目目录下创建名为` public` 的子目录 （因为这个目录中的所有文件都会直接对外开放，所以我们称这个目录为 public）。

static 中间件加在所有路由之前：

    app.use(express.static(__dirname + '/public'));

`static`中间件相当于给你想要发送的所有静态文件创建了一个路由，渲染文件并发送给客户端。接下来我们在`public`下面创建一个子目录` img`，并把 `logo.png`文件放在其中。

直接指向 `/img/logo.png` （注意：路径中没有 `public`，这个目录对客户端来说是隐形的）`static` 中间件会返回这个文件，并正确设定内容类型。

让 logo 出现在所有页面在`home.handlebars`写入:

    <body>
    <header><img src="/img/logo.png" alt="Meadowlark Travel Logo"></header>
        {\{\{body}\}\}
    </body>

重启服务器你会发现每个页面都出现了logo

#### （二）视图中的动态内容

视图真正的强大之处在于它可以包含动态信息。

比如在关于页面上发送“虚拟幸运饼干”。我们在` meadowlark.js `中定义一个幸运饼干数组：

    var fortunes = [
    "Conquer your fears or they will conquer you.",
    "Rivers need springs.",
    "Do not fear what you don't know.",
    "You will have a pleasant surprise.",
    "Whenever possible, keep it simple."
    ];

修改视图`（/views/about.handlebars）`加入\{\{fortune\}\}以显示幸运饼干：

    <h1>About Meadowlark Travel</h1>
    <p>Your fortune for the day:</p>
    <blockquote>\{\{fortune\}\}</blockquote>

接下来修改路由` /about，`随机发送幸运饼干：

    app.get('/about', function(req, res){
        var randomFortune =fortunes[Math.floor(Math.random() * fortunes.length)];
        res.render('about', { fortune: randomFortune });
    });

重启服务器，加载· /about· 页面，你会看到一个随机发放的幸运饼干。

---

### 总结

以上构建出了一套大体的脚手架

#### 从项目结构部分来看

* package.json -- 管理项目依赖

* .gitignore -- 控制代码库

* 项目根目录 -- 构建项目目录及存放代码及相关信息

#### 从业务逻辑上来看

* 入口文件 -- 加载模块，配置路由，中间件

* 请求和响应对象 -- 处理具体业务逻辑

* 模板引擎 -- 合并数据和视图

* 静态资源 -- 管理静态资源文件

* 动态内容 -- 以变量或其他方式更新可变内容

通过《Node与Express开发》第三章-省时省力的Express学习到了大体如何去构建一个Express项目。

