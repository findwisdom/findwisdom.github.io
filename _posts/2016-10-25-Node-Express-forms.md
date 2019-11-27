---
layout: post
title:  "Express学习（四）-- 表单处理"
date:   2016-10-25 12:35:05
categories: Node
tags:  Node Express note
author: wisdom
---

* content
{:toc}

本文为《Node与Express开发》第八章`表单处理`的读书笔记，记录了自己在学习Node与Express时所遇到的一些问题，加入了自己的一些见解。





从用户那里收集信息的常用方法就是使用 HTML 表单。无论是使用浏览器提交表单，还是使用 AJAX 提交，或是运用精巧的前端控件，底层机制通常仍旧是 HTML 表单。

### （一）向服务器发送客户端数据

向服务器发送客户端数据有两种方式：`查询字符串`和`请求正文`。通常，如果是使用`查询字符串`=>` GET 请求`；如果是使用请求正文=> `POST 请求`。

_有一种普遍的误解是 `POST 请求`是安全的，而 `GET 请求`不安全。_(看过许多人的博客和视屏都是这样说的)。

事实上如果使用 `HTTPS 协议`，两者都是安全的；如果不使用，则都不安全。如果不使用 `HTTPS 协议`，入侵者会像查看 `GET 请求`的查询字符串一样，轻松查看 `POST 请求`的报文数据。

如果使用 `GET请求`，用户会在查询字符串中看到所有的输入数据（包括隐藏域），浏览器同时限制查询字符串的长度（对请求正文没有长度限制），基于这些原因，一般推荐使用 `POST` 进行表单提交。

### （二）HTML表单

举个例子：

    <form action="/process" method="POST">
        <input type="hidden" name="hush" val="hidden, but not secret!">
        <div>
            <label for="fieldColor">Your favorite color: </label>
            <input type="text" id="fieldColor" name="color">
        </div>
        <div>
            <button type="submit">Submit</button>
        </div>
    </form>

虽然这段代码很短但却蕴含许多重要的东西，下面是自己觉得重要的几个点：

* `<form>` 标记中提交方法被明确地指定为 `POST` ,不这么做，默认进行 `GET` 提交。

* `action` 的值被指定为用于接收表单数据的 `URL`,忽略这个值，表单会提交到它被加载进来时的同一 `URL`。

* `<input>` 域中的 `name` 属性，是服务器能够识别的字段。 `name` 属性与 `id` 属性是截然不同的，`id`只适用于样式和前端功能（它不会发送到服务器端）。

* 保持表达逻辑上的一致性，一个页面上有两个不同的 `action`，使用两个不同的表单。

### （三）编码

当表单被提交（通过浏览器或 AJAX）时，某种程度上它必须被编码。如果不明确地指定 编码，则默认为 `application/x-wwwform-urlencoded`。

如果你需要上传文件，事情就开始变得复杂起来。使用 URL 编码很难发送文件，所以你不得不使用 `multipart/form-data` 编码类型，


### （三）Express表单处理

如果使用`GET`进行表单处理，表单域在 `req.query` 对象中。

如果有一个名称属性为`email` 的 `HTML` 输入字段，它的值会以 `req.query.email` 的形式传递到处理程序。

如果使用 `POST` （推荐使用的），需要引入中间件来解析 URL 编码体。首先，安装 `body-parser中间件``（ npm install --save body-parser ）`，然后引入：

    app.use(require('body-parser')());

一旦引入了 `body-parser` ，你会发现 `req.body` 变为可用，这样所有的表单字段将可用。注意一点， `req.body` 并不阻止你使用查询字符串。

为了演示，我们将使用`查询字符串`、一个隐藏字段以及可视字段，详见 `/views/newsletter.handlebars：`

    <h2>Sign up for our newsletter to receive news and specials!</h2>
    <form class="form-horizontal" role="form"
        action="/process?form=newsletter" method="POST">
        <input type="hidden" name="_csrf" value="{{csrf}}">
        <div class="form-group">
            <label for="fieldName" class="col-sm-2 control-label">Name</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="fieldName" name="name">
            </div>
        </div>
        <div class="form-group">
            <label for="fieldEmail" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-4">
                <input type="email" class="form-control"  id="fieldName" name="email">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-4">
                <button type="submit" class="btn btn-default">Register</button>
            </div>
        </div>
    </form>

以上使用了Bootstrap,如果感到费解可以参考[Twitter Bootstrap 文档]（http://getbootstrap.com）。

接下来看看示例1:

##### **示例1**　应用文件

    app.use(require('body-parser')());
    app.get('/newsletter', function(req, res){
        res.render('newsletter', { csrf: 'CSRF token goes here' });
    });
    app.post('/process', function(req, res){
        console.log('Form (from querystring): ' + req.query.form);
        console.log('CSRF token (from hidden form field): ' + req.body._csrf);
        console.log('Name (from visible form field): ' + req.body.name);
        console.log('Email (from visible form field): ' + req.body.email);
        res.redirect(303, '/thank-you');
    })

这就是所有的了。请注意，在处理程序中，我们将重定向到“thank you”视图。我们可以在此渲染视图，但是如果这样做，访问者的浏览器地址栏仍旧是 ``/process`，这可能会令人困惑。

### （四）处理AJAX表单

用 Express 处理 AJAX 表单非常简单；甚至可以使用相同的处理程序来处理 AJAX 请求和常规的浏览器回退。参考示例2 和 示例3。

##### **示例2** HTML 文件 （/views/newsletter.handlebars）

    <div class="formContainer">
        <form class="form-horizontal newsletterForm" role="form" action="/process?form=newsletter" method="POST">
            <input type="hidden" name="_csrf" value="{{csrf}}">
            <div class="form-group">
                <label for="fieldName" class="col-sm-2 control-label">Name</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="fieldName" name="name">
                </div>
            </div>
            <div class="form-group">
                <label for="fieldEmail" class="col-sm-2 control-label">Email</label>
                <div class="col-sm-4">
                    <input type="email" class="form-control" required id="fieldName" name="email">
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-offset-2 col-sm-4">
                    <button type="submit" class="btn btn-default">Register</button>
                </div>
            </div>
        </form>
    </div>
    {{#section 'jquery'}}
        <script>
            $(document).ready(function(){
                $('.newsletterForm').on('submit', function(evt){
                    evt.preventDefault();
                    var action = $(this).attr('action');
                    var $container = $(this).closest('.formContainer');
                    $.ajax({
                        url: action,
                        type: 'POST',
                        success: function(data){
                            if(data.success){
                                $container.html('<h2>Thank you!</h2>');
                            } else {
                                $container.html('There was a problem.');
                            }
                        },
                        error: function(){
                            $container.html('There was a problem.');
                        }
                    });
                });
            });
        </script>
    {{/section}}

##### **示例3** 应用程序文件

    app.post('/process', function(req, res){
        if(req.xhr || req.accepts('json,html')==='json'){
            // 如果发生错误，应该发送 { error: 'error description' }
            res.send({ success: true });
            } else {
            // 如果发生错误，应该重定向到错误页面
            res.redirect(303, '/thank-you');
        }
    });

Express 提供了两个方便的属性： `req.xhr` 和 `req.accepts` 。

如果是 AJAX 请求（XHR 是XML HTTP 请求的简称，AJAX 依赖于 XHR）， `req.xhr` 值为 true 。

 `req.accepts` 试图确定返回的最合适的响应类型。在此例中， `req.accepts('json,html')`询问最佳返回格式是JSON 还是 HTML。

如果是一个 AJAX 请求，或者 `User-Agent` 明确要求 `JSON` 优先于 `HTML`，那么就会返回合适的 JSON 数据；否则，返回一个重定向。

### （五）文件上传

对于复合表单处理，目前有两种流行而健壮的选择：Busboy 和 Formidable。我发现Formidable 要稍微简单一些，因为它有一个方便的回调方法，能够提供包含字段和文件信息的对象。下面的案例我们会使用 Formidable 演示。（其实是书上用的这种方法渣新听书上说的呗）

创建一个文件上传表单（views/contest/vacation-photo.handlebars）：

    <form class="form-horizontal" role="form" enctype="multipart/form-data" method="POST" action="/contest/vacation-photo/{year}/{month}">
        <div class="form-group">
            <label for="fieldName" class="col-sm-2 control-label">Name</label>
            <div class="col-sm-4">
                <input type="text" class="form-control" id="fieldName" name="name">
            </div>
        </div>
        <div class="form-group">
            <label for="fieldEmail" class="col-sm-2 control-label">Email</label>
            <div class="col-sm-4">
                <input type="email" class="form-control" required id="fieldName" name="email">
            </div>
        </div>
        <div class="form-group">
            <label for="fieldPhoto" class="col-sm-2 control-label">Vacation photo</label>
            <div class="col-sm-4">
                <input type="file" class="form-control" required accept="image/*" id="fieldPhoto" name="photo">
            </div>
        </div>
        <div class="form-group">
            <div class="col-sm-offset-2 col-sm-4">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </div>
    </form>

注意，我们必须指定 `enctype="multipart/form-data"` 来启用文件上传。我们也可以通过 `accept` 属性来限制上传文件的类型（这是可选的）。

现在安装 `Formidable（ npm install --save formidable ）`并创建一下路由处理程序：

    var formidable = require('formidable');
    app.get('/contest/vacation-photo',function(req,res){
        var now = new Date();
        res.render('contest/vacation-photo',{
            year: now.getFullYear(),month: now.getMont()
        });
    });
    app.post('/contest/vacation-photo/:year/:month', function(req, res){
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files){
            if(err) return res.redirect(303, '/error');
            console.log('received fields:');
            console.log(fields);
            console.log('received files:');
            console.log(files);
            res.redirect(303, '/thank-you');
        });
    });

继续运行，检查控制台日志。你会发现表单字段如你预期的那样：是一个有字段名称属性的对象。

文件对象包含更多的数据，对于每一个上传的文件，你会看到属性有文件大小、上传路径还有用户上传此文件的原始名字。

接下来如何处理这个文件就取决于你了：可以将它保存到数据库，将其复制到更持久的位置，或者上传到云端文件存储系统。

