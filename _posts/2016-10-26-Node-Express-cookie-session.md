---
layout: post
title:  "Express学习（五）-- Cookie与会话"
date:   2016-10-27 12:35:05
categories: cookie Node Express
tags: note Node Express
author: wisdom
---

* content
{:toc}

本文主要介绍了Express中的Cookie，同时转叙述了《Node与Express开发》对cookie的见解。





### （一）Cookie与会话

HTTP 是无状态协议。这就是说，当你在浏览器中加载页面，然后转到同一网站的另一页面时，服务器和浏览器都没有任何内在的方法可以认识到。换一种说法，Web 工作的方式就是在每个 HTTP 请求中都要包含所有必要的信息，服务器才能满足这个请求。

尽管这是个问题，如果故事到这里就结束，我们将永远无法“登录”。流媒体也无法工作。网站不能记忆你从一个页面到下一个页面的喜好。所以我们需要用某种办法在 HTTP 上建立状态，于是便有了 `cookie` 和 `会话` 。

如果故事到这里就结束，我们将永远无法“登录”。流媒体也无法工作。网站不能记忆你从一个页面到下一个页面的喜好。所以我们需要用某种办法在 HTTP 上建立状态，于是便有了 `cookie` 和`会话`。

关于 `cookie`，有些重要的事情需要我们了解。

#### 1.cookie对用户来说不是加密的

服务器向客户端发送的所有 `cookie` 都能被客户端查看。我们会稍微讨论一下签名 `cookie`，它可以混淆 `cookie` 中的内容，但对于窥探者来说这 `Cookie` 与会话绝没有加密那样的安全性。

#### 2.户可以删除或禁用cookie

用户对 `cookie` 有绝对的控制权，并且浏览器支持批量或单个删除 `cookie`。用户也可以禁用 `cookie`，但这更容易造成问题，因为只有最简单的 Web 应用程序才不需要依赖 `cookie`。

#### 3.一般的cookie可以被篡改

不管浏览器什么时候发起一个跟 `cookie` 关联的请求，只要你盲目地相信 `cookie` 中的内容，都有可能会受到攻击。

#### 4.cookie可以用于攻击

XSS 攻击中有一种技术就涉用恶意的 `JavaScript` 修改 `cookie` 中的内容。所以不要轻易相信返回到你的服务器的` cookie` 内容。用签名 `cookie` 会有帮助（这些篡改都会在签名 `cookie` 中留下明显的痕迹），并且还可以设定选项指明 `cookie` 只能由服务器修改。这些 `cookie` 的用途会受限，但它们肯定更安全。

#### 5.如果你滥用cookie，用户会注意到

如果你在用户的电脑上设了很多 `cookie`，或者存了很多数据，这可能会惹恼用户，所以你应该避免出现这种情况。尽量把对 `cookie` 的使用限制在最小范围内。

#### 6.如果可以选择，会话要优于cookie

大多数情况下，你可以用`会话`维持状态，一般来说这样做是明智的。并且会话更容易，你不用担心会滥用用户的存储，而且也更安全。当然，会话要依赖 cookie，但如果你使用会话，Express 会帮你做很多工作。

### （二）凭证的外化

为了保证 `cookie` 的安全，必须有一个 `cookie 秘钥`。`cookie 秘钥`是一个字符串，服务器知道它是什么，它会在 cookie 发送到客户端之前对 cookie 加密。这是一个不需要记住的密码，所以可以是随机字符串。

外化第三方凭证是一种常见的做法，比如` cookie 秘钥`、数据库密码和 API 令牌（Twitter、Facebook 等）。这不仅易于维护（容易找到和更新凭证），还可以让你的版本控制系统忽略这些凭证文件。这对放在 GitHub 或其他开源源码控制库上的开源代码库尤其重要。

将凭证外化在一个 JavaScript 文件中（用 JSON 或 XML 也行，相对来说JavaScript 最容易）。创建文件 credentials.js：

    module.exports = {
        cookieSecret: ' 把你的 cookie 秘钥放在这里 ',
    };

为了防止我们不慎把这个文件添加到源码库中，在 .gitignore 文件中加上 credentials.js。将凭证引入程序只需要这样做：

    var credentials = require('./credentials.js');

### （三）Express中的Cookie

在程序中开始设置和访问 `cookie` 之前，需要先引入中间件 `cookie-parser` 。首先 `npminstall --save cookie-parser` ，然后：

    res.cookie('monster', 'nom nom');
    res.cookie('signed_monster', 'nom nom', { signed: true });

任何字符串都可以作为 `cookie` 的名称。比如，我们可以用 `'signed monster'`代替 `'signed_monster'` ，但这样我们必须用括号才能取到 `cookie`： req.signedCookies['signed monster'] 。因此我建议不要在 cookie 的名称中使用特殊字符。

要删除 `cookie`，请用 `res.clearCookie` ：

    res.clearCookie('monster');

设置 `cookie` 时可以使用如下这些选项：

**domain**

控制跟 cookie 关联的域名。这样你可以将 cookie 分配给特定的子域名。注意，你不能给 cookie 设置跟服务器所用域名不同的域名，因为那样它什么也不会做。

**path**

控制应用这个 `cookie` 的路径。注意，路径会隐含地通配其后的路径。如果你用的路径是 `/ （默认值）`，它会应用到网站的所有页面上。如果你用的路径是 `/foo` ，它会应用到`/foo 、`  `/foo/bar` 等路径上。

**maxAge**

指定客户端应该保存 `cookie` 多长时间，单位是毫秒。如果你省略了这一选项，浏览器关闭时 `cookie` 就会被删掉。

**secure**

指定该 cookie 只通过安全（HTTPS）连接发送。

**httpOnly**

将这个选项设为 `true` 表明这个 `cookie` 只能由`服务器修改`。也就是说客户端 JavaScript不能修改它。这有助于防范 XSS 攻击。

**signed**

设为 true 会对这个 `cookie 签名`，这样就需要用 `res.signedCookies` 而不是 `res.cookies`访问它。被篡改的签名 `cookie` 会被服务器拒绝，并且 `cookie` 值会重置为它的原始值。

### （四）检查Cookie

多数浏览器都可以查看单个 `cookie` 和它们存储的值。在 Chrome 中，打开开发者工具，选择 `Resources` 标签，然后找到左侧树中的 `Cookies` 一项。展开它，你会看到当前访问的网站。点击它，你会看到所有跟这个网站关联的 `cookie`。

### （五）会话

会话实际上只是更方便的状态维护方法。要实现会话，必须在客户端存些东西，否则服务器无法从一个请求到下一个请求中识别客户端。

通常的做法是用一个包含唯一标识的cookie，然后服务器用这个标识获取相应的会话信息。

从广义上来说，有两种实现会话的方法：把所有东西都存在 cookie 里，或者只在 cookie 里存一个唯一标识，其他东西都存在服务器上。(前一种方式被称为“基于 cookie 的会话”意味着要把你添加到 cookie 中的所有东西都存在客户端浏览器中，所以不推荐用这种方式。)

### （六）内存存储

如果你更愿意把会话信息存在服务器上（这也是书上推荐的方式）必须找个地方存储它。入门级的选择是内存会话。它们非常容易设置，但也有个巨大的缺陷：重启服务器（你在本书中会做很多次）后会话信息就消失了。我们会在第 13 章介绍如何永久地存储会话信息。

首先安装 `express-session （ npm install --save express-session ）`。 然后， 在链入`cookie-parser`之后链入`express-session`：

    app.use(require('cookie-parser')(credentials.cookieSecret));
    app.use(require('express-session')());

中间件 `express-session` 接受带有如下选项的配置对象：

**key**

存放唯一会话标识的 cookie 名称。默认为 connect.sid 。

**store **

会话存储的实例。默认为一个 MemoryStore 的实例，可以满足我们当前的要求。

**cookie**

会话 cookie 的 cookie 设置 （ path 、 domain 、 secure 等）。适用于常规的 cookie 默认值。



