---
layout: post
title:  "Js继承之构造函数继承"
date:   2019-05-07 08:35:05
categories:  Javascript prototype constructor 继承
tags: Javascript prototype constructor 继承
author: wisdom
---

* content
{:toc}

上一篇我们介绍了原型链继承，原型链继承虽然很强大，但是单纯的原型链模式并不能很好地实现继承。

其中有一些问题所以我们来介绍一下构造函数继承






### (一) 原型链的缺点

#### 单纯的原型链继承最大的一个缺点，在于对原型中引用类型值的误修改

例子：

    //父类：人
    function Person () {
      this.head = '脑袋瓜子';
    }
    //子类：学生，继承了“人”这个类
    function Student(studentID) {
      this.studentID = studentID;
    }
    Student.prototype = new Person();

    var stu1 = new Student(1001);
    console.log(stu1.head); //脑袋瓜子

    stu1.head = '聪明的脑袋瓜子';
    console.log(stu1.head); //聪明的脑袋瓜子
    
    var stu2 = new Student(1002);
    console.log(stu2.head); //脑袋瓜子
        
以上例子，我们通过原型链继承，实现了 Student 类对 Person 类的继承。

所以 ，stu1 能访问到父类 Person 上定义的 head 属性，打印值为“脑袋瓜子”。

我们知道，所有的 Student 实例都共享着原型对象上的属性。那么，如果我在 stu1 上改变了 head 属性值，是不是会影响原型对象上的 head 值呢？

看我上面的代码就知道，肯定是不会。stu1 的 head 值确实是改变了，但是我重新实例化的对象 stu2 的 head 值仍旧不变。

这是因为，当 **实例中存在和原型对象上同名的属性时，会自动屏蔽原型对象上的同名属性** 。stu1.head = "聪明的脑袋瓜子" 实际上只是给 stu1 添加了一个本地属性 head 并设置了相关值。

所以当我们打印 stu1.head 时，访问的是该实例的本地属性，而不是其原型对象上的 head 属性（它因和本地属性名同名已经被屏蔽了）。

原型对象上任何类型的值，都不会被实例所`重写/覆盖`。

**在实例上设置与原型对象上同名属性的值，只会在实例上创建一个同名的本地属性。**

    

原型对象上`引用类型`(因为引用类型只是一个指针)的值可以通过实例进行修改，致使所有实例共享着的该引用类型的值也会随之改变。

    //父类：人
    function Person () {
      this.head = '脑袋瓜子';
      this.emotion = ['喜', '怒', '哀', '乐']; //人都有喜怒哀乐
    }
    //子类：学生，继承了“人”这个类
    function Student(studentID) {
      this.studentID = studentID;
    }
    Student.prototype = new Person();

    var stu1 = new Student(1001);
    console.log(stu1.emotion); //['喜', '怒', '哀', '乐']

    stu1.emotion.push('愁');
    console.log(stu1.emotion); //["喜", "怒", "哀", "乐", "愁"]
    
    var stu2 = new Student(1002);
    console.log(stu2.emotion); //["喜", "怒", "哀", "乐", "愁"]
    
这就是单纯的原型链继承的缺点，如果一个实例不小心修改了原型对象上引用类型的值，会导致其它实例也跟着受影响。

**因此，我们得出结论，原型上任何类型的属性值都不会通过实例被重写，但是引用类型的属性值会受到实例的影响而修改。**

#### 原型链不能实现子类向父类中传参也无法实现多继承。这里就不细说了

### (二)借用构造函数继承

#### 实现原理

在子类的构造函数中，通过 apply () 或 call ()的形式，调用父类构造函数，以实现继承。

    //父类：人
    function Person () {
      this.head = '脑袋瓜子';
      this.emotion = ['喜', '怒', '哀', '乐']; //人都有喜怒哀乐
    }
    //子类：学生，继承了“人”这个类
    function Student(studentID) {
      this.studentID = studentID;
      Person.call(this);
    }
    
    //Student.prototype = new Person();

    var stu1 = new Student(1001);
    console.log(stu1.emotion); //['喜', '怒', '哀', '乐']

    stu1.emotion.push('愁');
    console.log(stu1.emotion); //["喜", "怒", "哀", "乐", "愁"]
    
    var stu2 = new Student(1002);
    console.log(stu2.emotion); //["喜", "怒", "哀", "乐"]
    
在 stu1 = new Student ( ) 构造函数时，是 stu1 调用 Student 方法，所以其内部 this 的值指向的是 stu1, 所以 Person.call ( this ) 就相当于Person.call ( stu1 )。

就相当于 stu1.Person( )。最后，stu1 去调用 Person 方法时，Person 内部的 this 指向就指向了 stu1。

那么Person 内部this 上的所有属性和方法，都被拷贝到了 stu1 上。stu2 也是同理。

所以其实是，每个实例都具有自己的 emotion 属性副本。他们互不影响。
 
#### 缺点

这种形式的继承，每个子类实例都会拷贝一份父类构造函数中的方法，作为实例自己的方法，比如 eat()。这样做，有几个缺点：

**每个实例都拷贝一份，占用内存大，尤其是方法过多的时候。（函数复用又无从谈起了，本来我们用 prototype 就是解决复用问题的）**

**方法都作为了实例自己的方法，当需求改变，要改动其中的一个方法时，之前所有的实例，他们的该方法都不能及时作出更新。只有后面的实例才能访问到新方法。**

例子

    //父类：人
    function Person () {
      this.head = '脑袋瓜子';
      this.emotion = ['喜', '怒', '哀', '乐']; //人都有喜怒哀乐
      this.eat = function () {
        console.log('吃吃喝喝');
      }
      this.sleep = function () {
        console.log('睡觉');
      }
      this.run = function () {
        console.log('快跑');
      }
    }
    
所以，无论是单独使用原型链继承还是借用构造函数继承都有自己很大的缺点，最好的办法是，将两者结合一起使用，发挥各自的优势。

具体怎么做请看`Js组合继承`
