---
layout: post
title:  "JavaScript 中的 this"
date:   2015-06-12 14:06:05
categories: JavaScript
tags: JavaScript 慕课网 this ife
---

* content
{:toc}

本文为慕课网 [JavaScript深入浅出](http://www.imooc.com/learn/277) JavaScript 中的 this笔记。





## 全局的 this

全局 this 一般指向全局对象，浏览器中的全局对象就是 `window`。

例如：


```js
console.log(this.document === document); //true
console.log(this === window); //true

this.a = 91;
console.log(window.a); //91
```

## 一般函数的 this

```js
function f1 () {
    return this;
}
console.log(f1() === window);//true, global object
```

可以看到一般函数的 this 也指向 window，在 nodeJS 中为 global object

```js
function f2 () {
    "use strict";//使用严格模式
    return this;
}
console.log(f1() === undefined);//true
```

严格模式中，函数的 this 为 undefined


## 作为对象方法的函数的 this

```js
var o = {
    prop: 37,
    f: function() {
        return this.prop;
    }
};
console.log(o.f()); // 37
```

上述代码通过字面量创建对象 o。

f 为对象 o 的方法。这个方法的 this 指向这个对象，在这里即对象 o。

```js
var o = {
    prop: 37
};

function independent() {
    return this.prop;
}
o.f = independent;
console.log(o.f()); // 37
```

上面的代码，创建了对象 o，但是没有给对象 o，添加方法。而是通过 `o.f = independent` 临时添加了方法属性。这样这个方法中的 this 同样也指向这个对象 o。

## 对象原型链上的 this

```js
var o = {
    f: function() {
        return this.a + this.b;
    }
};
var p = Object.create(o);
p.a = 1;
p.b = 2;
console.log(p.f()); //3
```

通过 `var p = Object.create(o)` 创建的对象，p 是基于原型 o 创建出的对象。

p 的原型是 o，调用 f() 的时候是调用了 o 上的方法 f()，这里面的 this 是可以指向当前对象的，即对象 p。

## get/set 方法与 this

```js
function modulus() {
    return Math.sqrt(this.re * this.re + this.im * this.im);
}
var o = {
    re: 1,
    im: -1,
    get phase() {
        return Math.atan2(this.im, this.re);
    }
};
Object.defineProperty(o, 'modulus', {
    get: modulus,
    enumerable: true,
    configurable: true
});
console.log(o.phase, o.modulus); // -0.78 1.4142
```

get/set 方法中的 this 也会指向 get/set 方法所在的对象的。

## 构造器中的 this

```js
function MyClass() {
    this.a = 25;
}
var o = new MyClass();
console.log(o.a); //25
```

new MyClass() 的时候，MyClass()中的 this 会指向一个空对象，这个对象的原型会指向 MyClass.prototype。MyClass()没有返回值或者返回为基本类型时，默认将 this 返回。

```js
function C2() {
    this.a = 26;
    return {
        a: 24
    };
}

o = new C2();
console.log(o.a); //24
```

因为返回了对象，将这个对象作为返回值


## call/apply 方法与 this

```js
function add(c, d) {
    return this.a + this.b + c + d;
}
var o = {
    a: 1,
    b: 3
};
add.call(o, 5, 7); // 1 + 3 + 5 + 7 = 16
add.apply(o, [10, 20]); // 1 + 3 + 10 + 20 = 34
function bar() {
    console.log(Object.prototype.toString.call(this));
}
bar.call(7); // "[object Number]"
```

## bind 方法与 this

```js
function f() {
    return this.a;
}
var g = f.bind({
    a: "test"
});
console.log(g()); // test
var o = {
    a: 37,
    f: f,
    g: g
};
console.log(o.f(), o.g()); // 37, test
```

绑定之后再调用时，仍然会按绑定时的内容走，所以 o.g() 结果是 test

## 箭头函数中的 this

由于箭头函数不绑定this， 它会捕获其所在（即定义的位置）上下文的this值， 作为自己的this值，

所以 call() / apply() / bind() 方法对于箭头函数来说只是传入参数，对它的 this 毫无影响。
考虑到 this 是词法层面上的，严格模式中与 this 相关的规则都将被忽略。（可以忽略是否在严格模式下的影响）
因为箭头函数可以捕获其所在上下文的this值 所以

```js
    function Person() {  
        this.age = 0;  
        setInterval(() => {
            // 回调里面的 `this` 变量就指向了期望的那个对象了
            this.age++;
        }, 3000);
    }
    
    var p = new Person();
```
在setTimeout中的this指向了构造函数新生成的对象，而普通函数指向了全局window对象
```js
    var adder = {
      base : 1,
        
      add : function(a) {
        var f = v => v + this.base;
        return f(a);
      },
    
      addThruCall: function inFun(a) {
        var f = v => v + this.base;
        var b = {
          base : 2
        };
                
        return f.call(b, a);
      }
    };
    
    console.log(adder.add(1));         // 输出 2
    console.log(adder.addThruCall(1)); // 仍然输出 2（而不是3，其内部的this并没有因为call() 而改变，其this值仍然为函数inFun的this值，指向对象adder
```    
以上的箭头函数都是在方法内部，总之都是以非方法的方式使用，如果将箭头函数当做一个方法使用会怎样呢？

上例子
```js
    var obj = {
      i: 10,
      b: () => console.log(this.i, this),
      c: function() {
        console.log( this.i, this)
      }
    }
    obj.b();  // undefined window{...}
    obj.c();  // 10 Object {...}
```
可以看到，作为方法的箭头函数this指向全局window对象，而普通函数则指向调用它的对象
