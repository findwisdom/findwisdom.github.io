---
layout: post
title:  "Js之原型链继承"
date:   2019-05-06 08:35:05
categories:  Javascript prototype 继承
tags: Javascript prototype 继承
author: wisdom
---

* content
{:toc}

面向对象编程都会涉及到继承这个概念，JS中实现继承的方式主要是通过原型链的方法。

要想真正理解继承我们需要了解 构造函数、原型与实例之间的关系，及原型链的一些概念






### (一) 构造函数、原型与实例之间的关系

每创建一个函数，该函数就会自动带有一个 `prototype` 属性。`该属性是个指针`，指向了一个`对象`，什么是指针指针就好比学号通过学号我们可以找到对应的学生，假设突然，指针设置 null, 学号重置空了，不要慌，对象还存在，学生也没消失。只是不好找了。

原型对象上默认有一个属性 constructor，该属性也是一个指针，指向其相关联的构造函数(即该函数本身)。

通过调用构造函数产生的实例，都有一个`内部属性`(在chrome浏览器可以显示的看到`__proto__`)，指向了原型对象。所以实例能够访问原型对象上的所有属性和方法。

所以三者的关系是，每个构造函数都有一个`原型对象`，原型对象都包含一个指向`构造函数`的指针，而实例都包含一个指向原型对象的`内部指针`。通俗点说就是，实例通过内部指针可以访问到原型对象，原型对象通过`constructor指针`，又可以找到构造函数。

例子：

    function Dog (name) {
        this.name = name;
        this.type = 'Dog';
    }
    Dog.prototype.speak = function () {
    　　alert('wang');
    }
    var doggie = new Dog('jiwawa');
    doggie.speak();  //wang

以上代码定义了一个构造函数 Dog(),  Dog.prototype 指向的原型对象，其自带的属性construtor又指回了 Dog，即  Dog.prototype.constructor == Dog. 实例doggie由于其内部指针指向了该原型对象，所以可以访问到 speak方法。

![enter image description here](http://findwisdom.oss-cn-hongkong.aliyuncs.com/prototype/proptype-constructor.png?Expires=1557147437&OSSAccessKeyId=TMP.AgHnHEHX58itFN1GVYN6Ar6J8su9zHoGwfHE7lRVERPSxDc2sOLPO7-N1v_qMC4CFQCDb1pD5tJtQT3yc7NMJ0GKcNHqsgIVANLfkyZF71FYTz5QLnBMr9qq3BuM&Signature=Ukw8YbEOe3Y%2F3LPYyLOz6OpxsxE%3D)

Dog.prototype 只是一个指针，指向的是原型对象，但是这个原型对象并不特别，它也只是一个普通对象。假设说，这时候，我们让 Dog.protptype 不再指向最初的原型对象，而是另一个类 （Animal）的实例，情况会怎样呢？

![enter image description here](http://findwisdom.oss-cn-hongkong.aliyuncs.com/prototype/proptype-constructor1.png?Expires=1557147585&OSSAccessKeyId=TMP.AgHnHEHX58itFN1GVYN6Ar6J8su9zHoGwfHE7lRVERPSxDc2sOLPO7-N1v_qMC4CFQCDb1pD5tJtQT3yc7NMJ0GKcNHqsgIVANLfkyZF71FYTz5QLnBMr9qq3BuM&Signature=QxIPK0dDf4iXStmvkLEf8BGDOVs%3D)

### (二) 原型链

前面我们说到，所有的实例有一个内部指针，指向它的原型对象，并且可以访问原型对象上的所有属性和方法。

doggie实例指向了Dog的原型对象，可以访问Dog原型对象上的所有属性和方法；如果Dog原型对象变成了某一个类的实例 aaa，这个实例又会指向一个新的原型对象 AAA，那么 doggie 此时就能访问 aaa 的实例属性和 AA A原型对象上的所有属性和方法了。

同理，新的原型对象AAA碰巧又是另外一个对象的实例bbb，这个实例bbb又会指向新的原型对象 BBB，那么doggie此时就能访问 bbb 的实例属性和 BBB 原型对象上的所有属性和方法了。

这就是JS通过原型链实现继承的方法了。看下面一个例子：

    //定义一个 Animal 构造函数，作为 Dog 的父类
    function Animal () {
        this.superType = 'Animal';
    }

    Animal.prototype.superSpeak = function () {
        alert(this.superType);
    }

    function Dog (name) {
        this.name = name;
        this.type = 'Dog';
    }
    //改变Dog的prototype指针，指向一个 Animal 实例
    Dog.prototype = new Animal();
    // 将构造函数指向到 Dog
    Dog.prototype.constructor = Dog;
    //上面那行就相当于这么写
    //var animal = new Animal();
    //Dog.prototype = animal;

    Dog.prototype.speak = function () {
    　　alert(this.type);
    }

解释一下。以上代码，首先定义了一个 Animal 构造函数，通过new Animal()得到实例，会包含一个实例属性 superType 和一个原型属性 superSpeak。

另外又定义了一个Dog构造函数。然后情况发生变化，将Dog的原型对象覆盖成了 animal 实例。

当 doggie 去访问superSpeak属性时，js会先在doggie的实例属性中查找，发现找不到，然后，js就会去doggie 的原型对象上去找，doggie的原型对象已经被我们改成了一个animal实例，那就是去animal实例上去找。

先找animal的实例属性，发现还是没有 superSpeack, 最后去 animal 的原型对象上去找，诶，这才找到。

![enter image description here](http://findwisdom.oss-cn-hongkong.aliyuncs.com/prototype/proptype-constructor3.png?Expires=1557147879&OSSAccessKeyId=TMP.AgHnHEHX58itFN1GVYN6Ar6J8su9zHoGwfHE7lRVERPSxDc2sOLPO7-N1v_qMC4CFQCDb1pD5tJtQT3yc7NMJ0GKcNHqsgIVANLfkyZF71FYTz5QLnBMr9qq3BuM&Signature=7jP2aSaIwJva0El98Qm9GkyDCAY%3D)

这就说明，我们可以通过原型链的方式，实现 Dog 继承 Animal 的所有属性和方法。

总结来说：就是当重写了Dog.prototype指向的原型对象后，实例的内部指针也发生了改变，指向了新的原型对象，然后就能实现类与类之间的继承了。（但是如果在重写原型对象之前，产生的实例，其内部指针指向的还是最初的原型对象。

文章内容全都参考于《JAVASCRIPT 高级程序设计》
