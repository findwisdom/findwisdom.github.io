---
layout: post
title:  "Express学习（三）-- request 与 response"
date:   2016-10-23 12:35:05
categories: Node Express
tags: Node Express note
author: wisdom
---

* content
{:toc}

本文为《Node与Express开发》第九章`Cookie与会话`的读书笔记，记录了自己在学习Node与Express时所遇到的一些问题，加入了自己的一些见解。





在用 Express 构建 Web 服务器时，大部分工作都是从请求对象开始，到响应对象终止。这两个对象起源于 Node，Express 对其进行了扩展，《Node与Express开发》第六章就主要讲解了请求与响应的知识。

### （一）URL的组成部分

![href](http://oe9d5k8dj.bkt.clouddn.com/href.png)

#### 1.协议

协议确定如何传输请求。我们主要是处理 http 和 https。其他常见的协议还有 file 和 ftp。

#### 2.主机名

主机名标识服务器。运行在本地计算机（localhost）和本地网络的服务器可以简单地表示，比如用一个单词，或一个数字 IP 地址。在 Internet 环境下，主机名通常以一个顶级域名（TLD）结尾，比如 .com 或 .net。另外，也许还会有子域名作为主机名的前缀。子域名可以是任何形式的，其中 www 最为常见。子域名通常是可选的。

#### 3.端口

每一台服务器都有一系列端口号。一些端口号比较“特殊”，如 `80` 和 `443` 端口。如果省略端口值，那么默认 `80` 端口负责 `HTTP` 传输，`443` 端口负责 `HTTPS` 传输。如果不使用 `80` 和 `443` 端口，就需要一个大于 `1023 1` 的端口号。通常使用容易记忆的端口号，如`3000`、`8080` 或 `8088`。

#### 4.路径

URL 中影响应用程序的第一个组成部分通常是路径（在考虑协议、主机名和端口的基础上做决定很合理，但是不够好）。路径是应用中的页面或其他资源的唯一标识。

#### 5.查询字符串

查询字符串是一种键值对集合，是可选的。它以问号`（?）`开头，键值对则以与号`（&）`分隔开。所有的名称和值都必须是` URL `编码的。对此，JavaScript 提供了一个嵌入式的函数 `encodeURIComponent` 来处理。例如，空格被加号`（+）`替换。其他特殊字符被数字型字符替换。

#### 6.信息片段

信息片段（或散列）被严格限制在浏览器中使用，不会传递到服务器。用它控制单页应用或 AJAX 富应用越来越普遍。最初，信息片段只是用来让浏览器展现文档中通过锚点标记`（ <a id="chapter06"> ）`指定的部分。

### （二）HTTP请求方法

 `HTTP 协议` 确定了客户端与服务器通信的请求方法集合（通常称为 `HTTP verbs`）。很显然，`GET` 和 `POST` 最为常见。

#### 1.GET方法

从指定的服务器中获取数据.

使用`GET`方法时，查询字符串（键值对）被附加在`URL`地址后面一起发送到服务器：

    /test/demo_form.jsp?name1=value1&name2=value2

##### GET方法的特点

* GET请求能够被缓存

* GET请求会保存在浏览器的浏览记录中

* 以GET请求的URL能够保存为浏览器书签

* GET请求有长度限制

* GET请求主要用于获取数据

#### 2.POST方法

提交数据给指定的服务器处理

使用`POST`方法时，查询字符串在`POST信息`中单独存在，和`HTTP请求`一起发送到服务器：

    POST /test/demo_form.jsp HTTP/1.1
    Host: w3schools.com
    name1=value1&name2=value2

##### POST方法的特点

* POST请求不能被缓存下来

* POST请求不会保存在浏览器浏览记录中

* 以POST请求的URL无法保存为浏览器书签

* POST请求没有长度限制

##### 参考

如果想更多的了解的相关知识可以参考[GET和POST的比较的本质-愚人节第二天](http://blog.csdn.net/xnf1991/article/details/52157378)

### （三）请求报头

一个请求中会附带一个请求包头，包含一些“隐形”信息。语言、浏览器、操作系统和硬件设备。服务端可以根据这些信息再去生成有正对性的数据。

获取请求报头方式：

    app.get('/headers', function(req,res){
        res.set('Content-Type','text/plain');
        var s = '';
        for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
        res.send(s);
    });

这些报头信息存储在req.headers对象上，便于访问。

### （四）响应报头

服务器响应回传一些浏览器没必要渲染和显示的信息，通常是元数据和服务器信息。它告诉浏览器正在被传输的内容类型（网页、图片、样式表、客户端脚本等）。

在浏览器的开发者工具中可以找到响应报头信息。例如，在 Chrome 浏览器中查看响应报头信息的操作如下：

* 打开控制台

* 点击网络标签页

* 重新载入页面

* 在请求列表中选取网页（通常是第一个）

* 点击报头标签页，你就可以看到所有响应报头信息了

### （五）互联网媒体类型

内容类型报头信息极其重要，没有它，客户端很难判断如何渲染接收到的内容。内容类型报头就是一种_互联网媒体类型_,由一个类型、一个子类型以及可选的参数组成。

例如，`text/html;charset=UTF-8` 说明类型是 `text`，子类型是 `html`，字符编码是 `UTF-8`。

我们常见的 content type、Internet media type 和 MIME type 是可以互换的。MIME（多用途互联网邮件扩展）是互联网媒体类型的前身，它们大部分是相同的。

### （六）请求体

除请求报头外，请求还有一个主体（就像作为实际内容返回的响应主体一样）。一般 GET请求没有主体内容，但 POST 请求是有的。

`POST` 请求体最常见的媒体类型是 `application/x-www-form-urlendcoded` ，是键值对集合的简单编码，用 & 分隔（基本上和查询字符串的格式一样）。

如果 `POST` 请求需要支持文件上传，则媒体类型是 `multipart/form-data` ，它是一种更为复杂的格式。

最后是 `AJAX` 请求，它可以使用 `application/json` 。

### （七）请求对象

请求对象（通常传递到回调方法，这意味着你可以随意命名，通常命名为 `req` 或 `request` ）

的生命周期始于 `Node` 的一个核心对象 `http.IncomingMessage` 的实例。

Express 添加了一些附加功能。（除了来自 `Node` 的 `req.headers` 和`req.url` ，所有这些方法都由 Express 添加）。

**req.params**

一个数组，包含命名过的路由参数。

**req.param(name)**

返回命名的路由参数，或者 GET 请求或 POST 请求参数。(建议你忽略此方法)

**req.query**

一个对象，包含以键值对存放的查询字符串参数（通常称为 GET 请求参数）

**req.body**

一个对象，包含 `POST` 请求参数。这样命名是因为 `POST` 请求参数在 `REQUEST` 正文中传递，而不像查询字符串在 `URL` 中传递。要使 `req.body` 可用，需要中间件能够解析请求正文内容类型。

**req.route**

关于当前匹配路由的信息。主要用于路由调试。

**req.cookies/req.singnedCookies**

一个对象，包含从客户端传递过来的 cookies 值。

**req.headers**

从客户端接收到的请求报头。

**req.accepts([types])**

一个简便的方法，用来确定客户端是否接受一个或一组指定的类型（可选类型可以是单个的 MIME 类型，如 application/json 、一个逗号分隔集合或是一个数组）,假定浏览器默认始终接受 HTML。

**req.ip**

客户端的 IP 地址。

**req.path**

请求路径（不包含协议、主机、端口或查询字符串）。

**req.host**

一个简便的方法，用来返回客户端所报告的主机名。这些信息可以伪造，所以不应该用于安全目的。

**req.xhr**

一个简便属性，如果请求由 Ajax 发起将会返回 true 。

**req.protocol**

用于标识请求的协议（ http 或 https ）。

**req.secure**

一个简便属性，如果连接是安全的，将返回 true 。等同于 `req.protocol==='https'` 。

**req.url/req.originalUrl**

这些属性返回了路径和查询字符串（它们不包含协议、主机或端口）。

**req.url**

若是出于内部路由目的，则可以重写，但是 `req.orginalUrl` 旨在保留原始请求和查询字符串。

**req.acceptedLanguages**

一个简便方法，用来返回客户端首选的一组（人类的）语言。这些信息是从请求报头中解析而来的。

### （八）请求对象

响应对象（通常传递到回调方法，这意味着你可以随意命名它，通常命名为 `res` 、 `resp` 或`response` ）的生命周期始于 Node 核心对象 `http.ServerResponse` 的实例。

Express 添加了一些附加功能。下面列举了响应对象中最有用的属性和方法（所有这些方法都是由 Express添加的）。

**res.status(code)**

设置 HTTP 状态代码。Express 默认为 200（成功），所以你可以使用这个方法返回状态`404（页面不存在）`或 `500（服务器内部错误）`。

**res.set(name,value)**

设置响应头。这通常不需要手动设置。

**res.cookie（name,vaue,[options]）,res.clearCookie(name,[options])**

设置或清除客户端 cookies 值。需要中间件支持。

**res.redirect([status],url)**

重定向浏览器。默认重定向代码是 302（建立）。通常，你应尽量减少重定向，除非永久移动一个页面，这种情况应当使用代码 301（永久移动）。

**res.send(body),res.send(status,body)**

向客户端发送响应及可选的状态码。Express 的默认内容类型是 text/html 。如果你想改为 text/plain ，需要在 res.send 之前调用 res.set('Content-Type','text/plain\') 。如果 body 是一个对象或一个数组，响应将会以 JSON 发送（内容类型需要被正确设置），不过既然你想发送 JSON，我推荐你调用 res.json 。

**res.json(json),res.json(status,json)**

向客户端发送 JSON 以及可选的状态码。

**res.type(type)**

一个简便的方法，用于设置 Content-Type 头信息。基本上相当于 res.set('Content-Type','type') ，只是如果你提供了一个没有斜杠的字符串，它会试图把其当作文件的扩展名映射为一个互联网媒体类型。比如， `res.type('txt')` 会将 `Content-Type` 设为`text/plain` 。

**res.format(object)**

这个方法允许你根据接收请求报头发送不同的内容。这是它在 API 中的主要用途。这里有一个非常简单的例子：

    res.format({'text/plain':'hi there','text/html':'<b>hi there</b>'})

**res.attachment([filename]),res.download(path,[filename],[callback])**

这两种方法会将响应报头 `Content-Disposition` 设为 `attachment` ，这样浏览器就会选择下载而不是展现内容。你可以指定 filename 给浏览器作为对用户的提示。用 `res.download` 可以指定要下载的文件，而 `res.attachment` 只是设置报头。另外，你还要将内容发送到客户端。

**res.sendFile(path,[option],[callback])**

这个方法可根据路径读取指定文件并将内容发送到客户端。使用该方法很方便。使用静态中间件，并将发送到客户端的文件放在公共目录下。

**res.links(links) **

设置链接响应报头。这是一个专用的报头，在大多数应用程序中几乎没有用处。

**res.locals,res.render(view,[locals],callback) **

`res.locals` 是一个对象，包含用于渲染视图的默认上下文。 `res.render` 使用配置的模板引擎渲染视图,` res.render`的默认响应代码为 200，使用 `res.status` 可以指定一个不同的代码。

### （九）更多信息

由于 JavaScript 的原型继承，有时确切知道自己在做什么是很困难的。有时候弄明白到底什么是可用的是个挑战。

（看到这里其实有点懵逼不过慢慢来吧总有一天萌新也会成大神的）

**lib/application.js**

Express 主接口。如果想了解中间件是如何接入的，或视图是如何被渲染的，可以看
这里。

**lib/express.js **

这是一个相对较短的 shell，是 lib/application.js 中 Connect 的功能性扩展，它返回一个函数，可以用 http.createServer 运行 Express 应用。

**lib/request.js**

扩展了 Node 的 http.IncomingMessage 对象，提供了一个稳健的请求对象。关于请求对象属性和方法的所有信息都在这个文件里。

**lib/response.js**

扩展了 Node 的 http.ServerReponse 对象，提供响应对象。关于响应对象的所有属性和方法都在这个文件里。

**lib/router/route.js**

提供基础路由支持。尽管路由是应用的核心，但这个文件只有不到 200 行，你会发现它非常地简单优雅

（对于这些吾辈萌新以后慢慢了解）

### （十）小结

#### 1.内容渲染

大多数情况下，渲染内容用 `res.render`，它最大程度地根据布局渲染视图。

如果想写一个快速测试页，也许会用到 `res.send `。

可以使用 `req.query` 得到查询字符串的值，使用`req.session` 得到会话值，或使用 `req.cookie/req.singedCookies`得到 `cookies` 值。

示例 1到示例 8 演示了常见的内容渲染任务：

##### **示例 1**　基本用法

    // 基本用法
    app.get('/about', function(req, res){
    res.render('about');
    });

##### **示例 2**　200 以外的响应代码

    app.get('/error', function(req, res){
        res.status(500);
        res.render('error');
        });
    // 或是一行……
    app.get('/error', function(req, res){
        res.status(500).render('error');
    });

##### **示例 3**　将上下文传递给视图，包括查询字符串、cookie 和 session 值

    app.get('/greeting', function(req, res){
        res.render('about', {
        message: 'welcome',
        style: req.query.style,
        userid: req.cookie.userid,
        username: req.session.username,
        });
    });

##### **示例 4**　没有布局的视图渲染

    // 下面的 layout 没有布局文件，即 views/no-layout.handlebars
    // 必须包含必要的 HTML
    app.get('/no-layout', function(req, res){
        res.render('no-layout', { layout: null });
    });

##### **示例 5**　使用定制布局渲染视图
    // 使用布局文件 views/layouts/custom.handlebars
    app.get('/custom-layout', function(req, res){
        res.render('custom-layout', { layout: 'custom' });
    });

##### **示例 6**　渲染纯文本输出

    app.get('/test', function(req, res){
        res.type('text/plain');
        res.send('this is a test');
    });

##### **示例 7**　添加错误处理程序

    / 这应该出现在所有路由方法的结尾
    // 需要注意的是，即使你不需要一个 " 下一步 " 方法
    // 它也必须包含，以便 Express 将它识别为一个错误处理程序
    app.use(function(err, req, res, next){
        console.error(err.stack);
        res.status(500).render('error');
    });

##### **示例 8**　添加一个 404 处理程序

    // 这应该出现在所有路由方法的结尾
    app.use(function(req, res){
        res.status(404).render('not-found');
    });

#### 2.表单处理

    处理表单时，表单信息一般在 `req.body` 中（或者偶尔在 `req.quer` 中）。你可以使用`req.xhr` 来判断是 AJAX 请求还是浏览请求

示例 9 和示例 10:

##### **示例 9**　基本表单处理

    // 必须引入中间件 body-parser
    app.post('/process-contact', function(req, res){
        console.log('Received contact from ' + req.body.name +' <' + req.body.email + '>');
        // 保存到数据库……
        res.redirect(303, '/thank-you');
    });

##### **示例 10**　更强大的表单处理

    // 必须引入中间件 body-parser
    app.post('/process-contact', function(req, res){
        console.log('Received contact from ' + req.body.name +' <' + req.body.email + '>');
        try {
        // 保存到数据库……
        return res.xhr ?
            res.render({ success: true }) :
        res.redirect(303, '/thank-you');
        } catch(ex) {
            return res.xhr ?
                res.json({ error: 'Database error.' }) :
                res.redirect(303, '/database-error');
        }
    });

#### 3.提供一个API

如果提供一个类似于表单处理的 API，参数通常会在 `req.query` 中，虽然也可以使用 `req.body` 。与其他 API 不同，这种情况下通常会返回 JSON、XML 或纯文本，而不是 HTML。

示例 11 和示例 12 使用下面的“产品”数组（通常是从数据库中检索）：

    var tours = [
        { id: 0, name: 'Hood River', price: 99.99 },
        { id: 1, name: 'Oregon Coast', price: 149.95 },
    ];

##### **示例 11**　简单的 GET 节点，只返回 `JSON` 数据

    app.get('/api/tours'), function(req, res){
        res.json(tours);
    });

##### **示例 12**　GET 节点，返回 JSON、XML 或 text

示例 12 根据客户端的首选项，使用 Express 中的 `res.format` 方法对其响应。

    app.get('/api/tours', function(req, res){
        var toursXml = '<?xml version="1.0"?><tours>' +
        products.map(function(p){
            return '<tour price="' + p.price +'" id="' + p.id + '">' + p.name + '</tour>';
        }).join('') + '</tours>'';
        var toursText = tours.map(function(p){
        return p.id + ': ' + p.name + ' (' + p.price + ')';
        }).join('\n');
        res.format({
            'application/json': function(){
                res.json(tours);
            },
            'application/xml': function(){
                res.type('application/xml');
                res.send(toursXml);
            },
            'text/xml': function(){
                res.type('text/xml');
                res.send(toursXml);
            }
            'text/plain': function(){
                res.type('text/plain');
                res.send(toursXml);
            }
        });
    });

##### **示例 13**　用于更新的 PUT 节点

在示例 13 中，PUT 节点更新一个产品信息然后返回 JSON。参数在查询字符串中传递（路由字符串中的 '':id'' 命令 Express 在 `req.params` 中增加一个 id 属性）

    //API 用于更新一条数据并且返回 JSON；参数在查询字符串中传递
    app.put('/api/tour/:id', function(req, res){
        var p = tours.some(function(p){ return p.id == req.params.id });
        if( p ) {
            if( req.query.name ) p.name = req.query.name;
            if( req.query.price ) p.price = req.query.price;
            res.json({success: true});
        } else {
            res.json({error: 'No such tour exists.'});
        }
    });

##### **示例 14**　用于删除的 DEL 节点

    // API 用于删除一个产品
    api.del('/api/tour/:id', function(req, res){
    var i;
    for( var i=tours.length-1; i>=0; i-- ){
        if( tours[i].id == req.params.id ) break;
        if( i>=0 ) {
            tours.splice(i, 1);
            res.json({success: true});
        } else {
            res.json({error: 'No such tour exists.'});
        }
    });

### （十一）总结

《Node与Express开发》第六章章虽然没有将知识点讲得特别细致，但却将客户端请求与服务器响应的常用接口，及具体脉络大致的梳理了一次，信息量略大，也许是自己后端知识薄弱的原因吧，但我想多些时日一定能将其消化，知道自己的无知本身也是一种进步，愿诸君共勉共勉。



