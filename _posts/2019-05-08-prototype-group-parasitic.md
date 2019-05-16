---
layout: post
title:  "Js之寄生组合继承"
date:   2019-05-08 17:35:05
categories:  Javascript prototype  继承
tags: Javascript prototype  继承
author: wisdom
---

* content
{:toc}

前面我们介绍了组合继承

组合继承是javascript最常用的继承模式,不过,它也有自己的不足。




### (一) 组合式继承的缺陷

**组合继承无论在什么情况下,都会调用两次父类构造函数**

一次是在创建子类原型的时候,另一次是在子类构造函数内部。

子类最终会包含父类对象的全部实例属性,但我们不得不在调用子类构造函数时重写这些属性.请再看一次组合继承的例子:

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
      Person.call(this); // 第二次调用Person()
    }
    
    Student.prototype = new Person();  // 第一次调用Person()
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
        
在第一次调用Person构造函数时,Person.prototype会得到两个属性:head和emotion,他们都是Person的实例属性。

只不过现在位于Student的原型中.当调用Student构造函数时,又会调用一次Person构造函数,这一次又在新对象上创建了实例属性head和emotion.于是,这两个属性就屏蔽了原型中的两个同名属性.

结果是,有两组head和emotion属性,一组在Student的实例上,一组在Student的原型上。

这就是调用两次Person构造函数的结果.而现在,找到了解决这个问题的方法:`寄生组合式继承`.

### (二) 寄生组合式继承

寄生组合式继承:**通过借用构造函数来继承属性,通过原型链的混成形式来继承方法**。

思路:不必为了指定子类的原型而调用父类的构造函数,我们所需要的无非就是父类原型的一个副本而已。

本质上,就是使用寄生式继承来继承父类的原型,然后在将结果指定给子类的原型:

**Object.create()** 方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`。
 
```js
    function inheritPrototype(subType,superType){
          var prototype=object(superType.prototype); //创建父类原型的一个副本 等同于使用Object.create(superType.prototype)
          prototype.constructor=subType;   //为副本添加constructor属性,弥补重写原型而失去的constructor属性
          subType.prototype=prototype; //将创建的对象(副本)赋值给子类的原型
    }
```    

这样,我们就可以通过调用inheritPrototype()函数,替换前面例子中为子类原型的赋值语句了:

```js
    function inheritPrototype(subType,superType){
          var prototype=object(superType.prototype); //创建父类原型的一个副本 等同于使用Object.create(superType.prototype)
          prototype.constructor=subType;   //为副本添加constructor属性,弥补重写原型而失去的constructor属性
          subType.prototype=prototype; //将创建的对象(副本)赋值给子类的原型
    }

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
      Person.call(this); // 第二次调用Person()
    }
    
    inheritPrototype(Student, Person)
    
    var stu1 = new Student(1001);
    console.log(stu1.emotion); //['喜', '怒', '哀', '乐']
    
    stu1.emotion.push('愁');
    console.log(stu1.emotion); //["喜", "怒", "哀", "乐", "愁"]
    
    var stu2 = new Student(1002);
    console.log(stu2.emotion); //["喜", "怒", "哀", "乐"]
    
    stu1.eat(); //吃吃喝喝
    stu2.run(); //快跑
    console.log(stu1.constructor);  //Student
    
    alert(stu1 instanceof Student);   //true
    alert(stu1 instanceof Person);  //true
    alert(Student.prototype.isPrototypeOf(stu1));  //true
    alert(Person.prototype.isPrototypeOf(stu1)); //true
```    
    
这个例子的高效率体现在它只调用了一次Person构造函数,并且因此避免了在Student.prototype上创建不必要的 多余的属性。

与此同时,原型链还能保持不变.因此,还能够正常使用instanceof 和isPrototypeOf确定继承关系。   
