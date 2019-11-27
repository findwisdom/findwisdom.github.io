---
layout: post
title:  "Js之组合继承"
date:   2019-05-08 08:35:05
categories:  JavaScript
tags: JavaScript prototype  继承
author: wisdom
---

* content
{:toc}

前面我们介绍了原型链继承，与构造函数继承，但是都有他们的缺点

**原型链继承**：共享的原型属性容易被修改，在创建子类型的实例时，不能向超类传参数，不能实现多继承等等。

**构造函数继承**：生成额外的副本占用额外的内存,因此不能实现函数复用等。

下面让我我们看看二者的结合`组合继承`






### (一) 结合原型链继承与构造函数继承

原型链继承会改变引用属性，而构造函数会添加额外的副本。一般来说公用的方法是不需要额外的副本的。

所以我们可以将公共的方法，挂载到父类的原型对象上去，实现方法复用，然后子类通过原型链继承，就能调用这些方法啦？～

例子：

```js
    //父类：人
    function Person () {
      this.head = '脑袋瓜子';
      this.emotion = ['喜', '怒', '哀', '乐']; //人都有喜怒哀乐
    }
    //将 Person 类中需共享的方法放到 prototype 中，实现复用
    Person.prototype.eat = function () {
      console.log('吃吃喝喝');
    }
    Person.prototype.sleep = function () {
      console.log('睡觉');
    }
    Person.prototype.run = function () {
      console.log('快跑');
    }
    //子类：学生，继承了“人”这个类
    function Student(studentID) {
      this.studentID = studentID;
      Person.call(this);
    }
    
    Student.prototype = new Person();  //此时 Student.prototype 中的 constructor 被重写了，会导致 stu1.constructor === Person
    Student.prototype.constructor = Student;  //将 Student 原型对象的 constructor 指针重新指向 Student 本身
    
    var stu1 = new Student(1001);
    console.log(stu1.emotion); //['喜', '怒', '哀', '乐']
    
    stu1.emotion.push('愁');
    console.log(stu1.emotion); //["喜", "怒", "哀", "乐", "愁"]
    
    var stu2 = new Student(1002);
    console.log(stu2.emotion); //["喜", "怒", "哀", "乐"]
    
    stu1.eat(); //吃吃喝喝
    stu2.run(); //快跑
    console.log(stu1.constructor);  //Student
```    
        
首先，我们将 Person 类中需要复用的方法提取到 Person.prototype 中，然后设置 Student 的原型对象为 Person 类的一个实例，

这样 stu1 就能访问到 Person 原型对象上的属性和方法了。

其次，为保证 stu1 和 stu2 拥有各自的父类属性副本，我们在 Student 构造函数中，还是使用了 Person.call ( this ) 方法。

如此，结合原型链继承和借用构造函数继承，就完美地解决了之前这二者各自表现出来的缺点。

　
组合继承是javascript最常用的继承模式,不过,它也有自己的不足:**组合继承无论在什么情况下,都会调用两次父类构造函数**。

一次是在创建子类原型的时候,另一次是在子类构造函数内部.子类最终会包含父类对象的全部实例属性,但我们不得不在调用子类构造函数时重写这些属性。

如何避免这一问题呢，那么请看`寄生组合式继承`
