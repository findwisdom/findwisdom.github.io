---
layout: post
title:  "Javascript 图片预加载"
date:   2016-10-11 21:35:05
categories: JavaScript
tags:  JavaScript load
author: wisdom
---

* content
{:toc}

本文为介绍页面预加载的一些方法。





预加载图片是提高用户体验的一个很好方法。图片预先加载到浏览器中，访问者便可顺利地在你的网站上冲浪，并享受到极快的加载速度。这对图片画廊及图片占据很大比例的网站来说十分有利，本文将分享一些预加载技术，来增强网站的性能与可用性。

### 方法一：用CSS和JavaScript实现预加载
---

实现预加载图片有很多方法，包括使用CSS、JavaScript及两者的各种组合。这些技术可根据不同设计场景设计出相应的解决方案，十分高效。

单纯使用CSS，可容易、高效地预加载图片，代码如下：

    preload-01 { background: url(http://domain.tld/image-01.png) no-repeat -9999px -9999px; }
    preload-02 { background: url(http://domain.tld/image-02.png) no-repeat -9999px -9999px; }
    preload-03 { background: url(http://domain.tld/image-03.png) no-repeat -9999px -9999px; }

将这三个ID选择器应用到(X)HTML元素中，我们便可通过CSS的background属性将图片预加载到屏幕外的背景上。只要这些图片的路径保持不变，当它们在Web页面的其他地方被调用时，浏览器就会在渲染过程中使用预加载（缓存）的图片。简单、高效，不需要任何JavaScript。

该方法虽然高效，但仍有改进余地。使用该法加载的图片会同页面的其他内容一起加载，增加了页面的整体加载时间。为了解决这个问题，我们增加了一些JavaScript代码，来推迟预加载的时间，直到页面加载完毕。代码如下：

    function preloader() {
        if (document.getElementById) {
            document.getElementById("preload-01").style.background = "url(http://domain.tld/image-01.png) no-repeat -9999px -9999px";
            document.getElementById("preload-02").style.background = "url(http://domain.tld/image-02.png) no-repeat -9999px -9999px";
            document.getElementById("preload-03").style.background = "url(http://domain.tld/image-03.png) no-repeat -9999px -9999px";
        }
    }

    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }

    addLoadEvent(preloader);

在该脚本的第一部分，我们获取使用类选择器的元素，并为其设置了background属性，以预加载不同的图片。

该脚本的第二部分，我们使用addLoadEvent()函数来延迟preloader()函数的加载时间，直到页面加载完毕。

如果JavaScript无法在用户的浏览器中正常运行，会发生什么？很简单，图片不会被预加载，当页面调用图片时，正常显示即可。

---

### 方法二：仅使用JavaScript实现预加载

---
上述方法有时确实很高效，但我们逐渐发现它在实际实现过程中会耗费太多时间。相反，我更喜欢使用纯JavaScript来实现图片的预加载。下面将提供两种这样的预加载方法，它们可以很漂亮地工作于所有现代浏览器之上。

#### JavaScript代码段1

只需简单编辑、加载所需要图片的路径与名称即可，很容易实现：

    <div class="hidden">
        <script type="text/javascript">
                var images = new Array()
                function preload() {
                    for (i = 0; i < preload.arguments.length; i++) {
                        images[i] = new Image()
                        images[i].src = preload.arguments[i]
                    }
                }
                preload(
                    "http://domain.tld/gallery/image-001.jpg",
                    "http://domain.tld/gallery/image-002.jpg",
                    "http://domain.tld/gallery/image-003.jpg"
                )
        </script>
    </div>

该方法尤其适用预加载大量的图片。


#### JavaScript代码段2

该方法与上面的方法类似，也可以预加载任意数量的图片。将下面的脚本添加入任何Web页中，根据程序指令进行编辑即可。

    <div class="hidden">
        <script type="text/javascript">
                if (document.images) {
                    img1 = new Image();
                    img2 = new Image();
                    img3 = new Image();
                    img1.src = "http://domain.tld/path/to/image-001.gif";
                    img2.src = "http://domain.tld/path/to/image-002.gif";
                    img3.src = "http://domain.tld/path/to/image-003.gif";
                }
        </script>
    </div>

正如所看见，每加载一个图片都需要创建一个变量，如`img1 = new Image();`，及图片源地址声明，如`img3.src = "../path/to/image-003.gif";`。参考该模式，你可根据需要加载任意多的图片.


我们又对该方法进行了改进。将该脚本封装入一个函数中，并使用 `addLoadEvent（）`，延迟预加载时间，直到页面加载完毕。

    function preloader() {
        if (document.images) {
            var img1 = new Image();
            var img2 = new Image();
            var img3 = new Image();
            img1.src = "http://domain.tld/path/to/image-001.gif";
            img2.src = "http://domain.tld/path/to/image-002.gif";
            img3.src = "http://domain.tld/path/to/image-003.gif";
        }
    }
    function addLoadEvent(func) {
        var oldonload = window.onload;
        if (typeof window.onload != 'function') {
            window.onload = func;
        } else {
            window.onload = function() {
                if (oldonload) {
                    oldonload();
                }
                func();
            }
        }
    }
    addLoadEvent(preloader);

---

### 方法三：使用Ajax实现预加载

上面所给出的方法似乎不够酷，那现在来看一个使用Ajax实现图片预加载的方法。该方法利用DOM，不仅仅预加载图片，还会预加载CSS、JavaScript等相关的东西。使用Ajax，比直接使用JavaScript，优越之处在于JavaScript和CSS的加载不会影响到当前页面。该方法简洁、高效。

    window.onload = function() {
        setTimeout(function() {
            // XHR to request a JS and a CSS
            var xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://domain.tld/preload.js');
            xhr.send('');
            xhr = new XMLHttpRequest();
            xhr.open('GET', 'http://domain.tld/preload.css');
            xhr.send('');
            // preload image
            new Image().src = "http://domain.tld/preload.png";
        }, 1000);
    };

上面代码预加载了`“preload.js”`、`“preload.css”`和`“preload.png”`。1000毫秒的超时是为了防止脚本挂起，而导致正常页面出现功能问题。

下面，我们看看如何用JavaScript来实现该加载过程：

    window.onload = function() {

        setTimeout(function() {

            // reference to <head>
            var head = document.getElementsByTagName('head')[0];

            // a new CSS
            var css = document.createElement('link');
            css.type = "text/css";
            css.rel  = "stylesheet";
            css.href = "http://domain.tld/preload.css";

            // a new JS
            var js  = document.createElement("script");
            js.type = "text/javascript";
            js.src  = "http://domain.tld/preload.js";

            // preload JS and CSS
            head.appendChild(css);
            head.appendChild(js);

            // preload image
            new Image().src = "http://domain.tld/preload.png";

        }, 1000);

    };

这里，我们通过DOM创建三个元素来实现三个文件的预加载。正如上面提到的那样，使用Ajax，加载文件不会应用到加载页面上。从这点上看，Ajax方法优越于JavaScript。

*补充：加载完毕回调函数

我们写出下面的代码：

    function loadImage(url, callback) {
      var img = new Image();
      img.src = url;

      img.onload = function(){ //图片下载完毕时异步调用callback函数。
        callback.call(img);   // 将callback函数this指针切换为img。
      };
    }

在firefox中测试一下，发现不错，果然和预想的效果一样，在图片下载后，就会弹出图片的宽度来。无论点击多少次或者刷新结果都一样。

不过，做到这一步，先别高兴太早——还需要考虑一下浏览器的兼容性，于是，赶紧到ie里边测试一下。没错，同样弹出了图片的宽度。但是，再点击load的时候，情况就不一样了，什么反应都没有了。刷新一下，也同样如此。

经过对多个浏览器版本的测试，发现ie6、opera都会这样，而firefox和safari则表现正常。其实，原因也挺简单的，就是因为浏览器的缓存 了。当图片加载过一次以后，如果再有对该图片的请求时，由于浏览器已经缓存住这张图片了，不会再发起一次新的请求，而是直接从缓存中加载过来。对于 firefox和safari，它们视图使这两种加载方式对用户透明，同样会引起图片的onload事件，而ie和opera则忽略了这种同一性，不会引 起图片的onload事件，因此上边的代码在它们里边不能得以实现效果。

怎么办呢？最好的情况是Image可以有一个状态值表明它是否已经载入成功了。从缓存加载的时候，因为不需要等待，这个状态值就直接是表明已经下载了，而从http请求加载时，因为需要等待下载，这个值显示为未完成。这样的话，就可以搞定了。

经过一些分析，终于发现一个为各个浏览器所兼容的Image的属性——complete。所以，在图片onload事件之前先对这个值做一下判断即可。最后，代码变成如下的样子：

    function loadImage(url, callback) {
        var img = new Image(); //创建一个Image对象，实现图片的预下载
        img.src = url;

        if (img.complete) { // 如果图片已经存在于浏览器缓存，直接调用回调函数
            callback.call(img);
            return; // 直接返回，不用再处理onload事件
        }

        img.onload = function () { //图片下载完毕时异步调用callback函数。
            callback.call(img);//将回调函数的this替换为Image对象
        };
    };

虽然代码很简单，但却很实用。

*附：再谈javascript图片预加载

lightbox类效果为了让图片居中显示而使用预加载，需要等待完全加载完毕才能显示，体验不佳（如filick相册的全屏效果）。javascript无法获取img文件头数据，真的是这样吗？本文通过一个巧妙的方法让javascript获取它。

这是大部分人使用预加载获取图片大小的例子：

    var imgLoad = function (url, callback) {
        var img = new Image();

        img.src = url;
        if (img.complete) {
            callback(img.width, img.height);
        } else {
            img.onload = function () {
                callback(img.width, img.height);
                img.onload = null;
            };
        };

    };

可以看到上面必须等待图片加载完毕才能获取尺寸，其速度不敢恭维，我们需要改进。

web应用程序区别于桌面应用程序，响应速度才是最好的用户体验。如果想要速度与优雅兼得，那就必须提前获得图片尺寸，如何在图片没有加载完毕就能获取图片尺寸？

十多年的上网经验告诉我：浏览器在加载图片的时候你会看到图片会先占用一块地然后才慢慢加载完毕，并且不需要预设width与height属性，因为浏览器能够获取图片的头部数据。基于此，只需要使用javascript定时侦测图片的尺寸状态便可得知图片尺寸就绪的状态。

当然实际中会有一些兼容陷阱，如width与height检测各个浏览器的不一致，还有`webkit new Image()`建立的图片会受以处在加载进程中同url图片影响，经过反复测试后的最佳处理方式：

    // 更新：
    // 05.27: 1、保证回调执行顺序：error > ready > load；2、回调函数this指向img本身
    // 04-02: 1、增加图片完全加载后的回调 2、提高性能

    /**
     * 图片头数据加载就绪事件 - 更快获取图片尺寸
     * @version    2011.05.27
     * @author    TangBin
     * @see        http://www.planeart.cn/?p=1121
     * @param    {String}    图片路径
     * @param    {Function}    尺寸就绪
     * @param    {Function}    加载完毕 (可选)
     * @param    {Function}    加载错误 (可选)
     * @example imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
            alert('size ready: width=' + this.width + '; height=' + this.height);
        });
     */
    var imgReady = (function () {
        var list = [], intervalId = null,

        // 用来执行队列
        tick = function () {
            var i = 0;
            for (; i < list.length; i++) {
                list[i].end ? list.splice(i--, 1) : list[i]();
            };
            !list.length && stop();
        },

        // 停止所有定时器队列
        stop = function () {
            clearInterval(intervalId);
            intervalId = null;
        };

        return function (url, ready, load, error) {
            var onready, width, height, newWidth, newHeight,
                img = new Image();

            img.src = url;

            // 如果图片被缓存，则直接返回缓存数据
            if (img.complete) {
                ready.call(img);
                load && load.call(img);
                return;
            };

            width = img.width;
            height = img.height;

            // 加载错误后的事件
            img.onerror = function () {
                error && error.call(img);
                onready.end = true;
                img = img.onload = img.onerror = null;
            };

            // 图片尺寸就绪
            onready = function () {
                newWidth = img.width;
                newHeight = img.height;
                if (newWidth !== width || newHeight !== height ||
                    // 如果图片已经在其他地方加载可使用面积检测
                    newWidth * newHeight > 1024
                ) {
                    ready.call(img);
                    onready.end = true;
                };
            };
            onready();

            // 完全加载完毕的事件
            img.onload = function () {
                // onload在定时器时间差范围内可能比onready快
                // 这里进行检查并保证onready优先执行
                !onready.end && onready();

                load && load.call(img);

                // IE gif动画会循环执行onload，置空onload即可
                img = img.onload = img.onerror = null;
            };

            // 加入队列中定期执行
            if (!onready.end) {
                list.push(onready);
                // 无论何时只允许出现一个定时器，减少浏览器性能损耗
                if (intervalId === null) intervalId = setInterval(tick, 40);
            };
        };
    })();

调用例子：

         imgReady('http://www.google.com.hk/intl/zh-CN/images/logo_cn.png', function () {
             alert('size ready: width=' + this.width + '; height=' + this.height);
         });

---
[原文地址](http://blog.csdn.net/yisuowushinian/article/details/46227115)
