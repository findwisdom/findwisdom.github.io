/* jshint asi:true */
//先等图片都加载完成
//再执行布局函数

/**
 * 执行主函数
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {

    /**
     * 内容JSON
     */
    var demoContent = [{
        demo_link: 'http://find_wisdom.coding.me/webapp',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/home_webapp_s.jpg',
        code_link: 'https://github.com/findwisdom/webapp',
        title: 'webapp 组件式开发',
        core_tech: 'javascript mobile',
        description: '使用组件式开发webapp,依托于fullpage.js,开发全站，构建页面只需要链式调用添加内容即可，里面使用canvas+javascript封装了常用图表组件，环图，柱图，饼图，可复用性高。'
    },{
        demo_link: 'http://www.luoxuting.cn/project/sellapp.html',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/vue2.0%20%E9%A5%BF%E4%BA%86%E4%B9%88.png',
        code_link: 'https://github.com/findwisdom/vue-sell-app',
        title: 'VUE2.0 饿了么APP',
        core_tech: 'VUE2.O Javascript better-scroll sass webpack',
        description: '使用VUE2.O Javascript better-scroll sass webpack等技术制作的高仿饿了么外卖APP'
    },{
        demo_link: 'http://find_wisdom.coding.me/canvas_times',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/canvas_time1111.jpg',
        code_link: 'https://github.com/findwisdom/canvs_time',
        title: 'Canvas 绚丽的小球倒计时',
        core_tech: 'Canvas Javascript',
        description: '使用Canvas与javascript制作的的小球仿自由落体倒计时动画，响应方式布局，修改可将其改变为多种时间管理工具。'
    }, {
        demo_link: 'https://findwisdom.github.io/slider/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/slider1111.jpg',
        code_link: 'https://github.com/findwisdom/slider',
        title: '渐隐的全屏轮播插件',
        core_tech: 'JQuery CSS3',
        description: '一款自己封装的渐隐的全屏轮播插件，可具有自己替换图片，添加按钮功能等，在任职公司官网<a href ="http://www.3-he.com.cn/">http://www.3-he.com.cn/</a>有应用。'
    },{
        demo_link: 'https://findwisdom.github.io/love-shopping/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/love-shop.png',
        code_link: 'https://github.com/findwisdom/love-shopping',
        title: '购物网小DEMO',
        core_tech: 'JQuery CSS HTML',
        description: '才开始学前端时练手的购物网小DOMO,使用jquery在里面加了轮播，换肤，评星，图片放大镜，价格计算等多种特效。'
    },{
        demo_link: 'https://findwisdom.github.io/a-company-website-demo/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/a%20comepany%20demo_%E7%9C%8B%E5%9B%BE%E7%8E%8B.png',
        code_link: 'https://github.com/findwisdom/a-company-website-demo',
        title: 'a-company-website-demo',
        core_tech: 'JQuery CSS HTML',
        description: '才开始学前端时练手做的企业介绍页面DOMO,使用jquery在里面加了轮播，由此熟悉了网站切图。'
    },{
        demo_link: 'https://findwisdom.github.io/my-Resume/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/resume.png',
        code_link: 'https://github.com/findwisdom/my-Resume',
        title: '让我找到工作的简历',
        core_tech: 'JQuery CSS HTML reveal.js',
        description: '使用reveal.js做的简历，就是因为这个简历让我完成了从设计师到程序员的转变。'
    },{
        demo_link: 'https://findwisdom.github.io/javascript-slider/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/js_slider.png',
        code_link: 'https://github.com/findwisdom/javascript-slider',
        title: '原生javascript制作的幻灯片',
        core_tech: 'Javascript',
        description: '使用原生javascript制作的动画幻灯片，同时在其中封装了insertAfter（）函数，解决了原生javascript中只有insertBefor（）函数这一问题。'
    },{
        demo_link: 'http://find_wisdom.coding.me/shys-website',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/shys.png',
        code_link: 'https://github.com/findwisdom/shys-website',
        title: '移动微信商城',
        core_tech: 'Jquery HTML CSS',
        description: '使用Jquery HTML5 CSS3 搭建的微信商城，其内封装了多种移动端特效。'
    },{
        demo_link: 'https://findwisdom.github.io/image-player/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/imge%20player.png',
        code_link: 'https://github.com/findwisdom/image-player ',
        title: '原生javascript制作的画廊效果',
        core_tech: 'Javascript HTML CSS',
        description: '使用原生Javascript制作的图片画廊，将平稳退化与渐进增强的理念融入了其中。'
    },{
        demo_link: 'https://findwisdom.github.io/image-change/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/image%20change.png',
        code_link: 'https://github.com/findwisdom/image-change',
        title: '颜艺切换板',
        core_tech: 'Jquery HTML CSS',
        description: '关于图片切换制作的小DEMO。'
    },{
        demo_link: 'https://findwisdom.github.io/Fantasy-bootstrap/',
        img_link: 'http://oe9d5k8dj.bkt.clouddn.com/fantasy%20bootstrap.png',
        code_link: 'https://github.com/findwisdom/Fantasy-bootstrap',
        title: '幻想学院',
        core_tech: 'Bootstrap',
        description: '使用Bootstrap制作的前台页面小DEMO。'
    }];

    contentInit(demoContent) //内容初始化
    waitImgsLoad() //等待图片加载，并执行布局初始化
}());



/**
 * 内容初始化
 * @return {[type]} [description]
 */
function contentInit(content) {
    // var htmlArr = [];
    // for (var i = 0; i < content.length; i++) {
    //     htmlArr.push('<div class="grid-item">')
    //     htmlArr.push('<a class="a-img" href="'+content[i].demo_link+'">')
    //     htmlArr.push('<img src="'+content[i].img_link+'">')
    //     htmlArr.push('</a>')
    //     htmlArr.push('<h3 class="demo-title">')
    //     htmlArr.push('<a href="'+content[i].demo_link+'">'+content[i].title+'</a>')
    //     htmlArr.push('</h3>')
    //     htmlArr.push('<p>主要技术：'+content[i].core_tech+'</p>')
    //     htmlArr.push('<p>'+content[i].description)
    //     htmlArr.push('<a href="'+content[i].code_link+'">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>')
    //     htmlArr.push('</p>')
    //     htmlArr.push('</div>')
    // }
    // var htmlStr = htmlArr.join('')
    var htmlStr = ''
    for (var i = 0; i < content.length; i++) {
        htmlStr +=
            '<div class="grid-item">' +
            '   <a class="a-img" href="' + content[i].demo_link + '">' +
            '       <img src="' + content[i].img_link + '">' +
            '   </a>' +
            '   <h3 class="demo-title">' +
            '       <a href="' + content[i].demo_link + '">' + content[i].title + '</a>' +
            '   </h3>' +
            '   <p>主要技术：' + content[i].core_tech + '</p>' +
            '   <p>' + content[i].description +
            '       <a href="' + content[i].code_link + '">源代码 <i class="fa fa-code" aria-hidden="true"></i></a>' +
            '   </p>' +
            '</div>'
    }
    var grid = document.querySelector('.grid')
    grid.insertAdjacentHTML('afterbegin', htmlStr)
}

/**
 * 等待图片加载
 * @return {[type]} [description]
 */
function waitImgsLoad() {
    var imgs = document.querySelectorAll('.grid img')
    var totalImgs = imgs.length
    var count = 0
        //console.log(imgs)
    for (var i = 0; i < totalImgs; i++) {
        if (imgs[i].complete) {
            //console.log('complete');
            count++
        } else {
            imgs[i].onload = function() {
                // alert('onload')
                count++
                //console.log('onload' + count)
                if (count == totalImgs) {
                    //console.log('onload---bbbbbbbb')
                    initGrid()
                }
            }
        }
    }
    if (count == totalImgs) {
        //console.log('---bbbbbbbb')
        initGrid()
    }
}

/**
 * 初始化栅格布局
 * @return {[type]} [description]
 */
function initGrid() {
    var msnry = new Masonry('.grid', {
        // options
        itemSelector: '.grid-item',
        columnWidth: 250,
        isFitWidth: true,
        gutter: 20,
    })
}
