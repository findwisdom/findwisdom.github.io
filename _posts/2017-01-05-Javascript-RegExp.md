---
layout: post
title:  " Javascript 的 RegExp"
date:   2017-01-05 08:35:05
categories:  JavaScript
tags: JavaScript RegExp
author: wisdom
---

* content
{:toc}

ECMAScript 通过 RegExp 类型来支持正则表达式，于是今天就好好的复习一下JS的 `RegExp类型` 吧；









## (一) RegExp 类型：

### 字面量形式定义正则表达式

    var expression = / pattern / flags ;

其中的模式（pattern）部分可以是任何简单或复杂的正则表达式。

每个正则表达式都可带有一或多个标志（flags），用以标明正则表达式的行为。

* g ：表示全局（global）模式，即模式将被应用于所有字符串，而非在发现第一个匹配项时立即停止；

* i ：表示不区分大小写（case-insensitive）模式，即在确定匹配项时忽略模式与字符串的大小写；

* m ：表示多行（multiline）模式，即在到达一行文本末尾时还会继续查找下一行中是否存在与模式匹配的项。

案例如下：

```js
    /*匹配字符串中所有"at"的实例*/
    var pattern1 = /at/g;

    /*匹配第一个"bat"或"cat"，不区分大小写*/
    var pattern2 = /[bc]at/i;

    /*匹配所有以"at"结尾的 3 个字符的组合，不区分大小写*/
    var pattern3 = /.at/gi;
```
    
与其他语言中的正则表达式类似，模式中使用的所有元字符都必须转义。正则表达式中的元字符包括：

    ( [ { \ ^ $ | ) ? * + .]}

如果想要匹配字符串中包含的这些字符，就必须对它们进行转义。下面给出几个例子。

```js
    /*匹配第一个"bat"或"cat"，不区分大小写*/
    var pattern1 = /[bc]at/i;

    /*匹配第一个" [bc]at"，不区分大小写*/
    var pattern2 = /\[bc\]at/i;

    /*匹配所有以"at"结尾的 3 个字符的组合，不区分大小写*/
    var pattern3 = /.at/gi;

    /* 匹配所有".at"，不区分大小写*/
    var pattern4 = /\.at/gi;
```    

### RegExp 构造函数

* 它接收两个参数：一个是要匹配的字符串模式，另一个是可选的标志字符串。

```js
    /*匹配第一个"bat"或"cat"，不区分大小写*/
    var pattern1 = /[bc]at/i;

    /*与 pattern1 相同，只不过是使用构造函数创建的*/
    var pattern2 = new RegExp("[bc]at", "i");
```    

在此， pattern1 和 pattern2 是两个完全等价的正则表达式。

## (二) RegExp对象

### RegExp对象方法：

#### test()

`test 方法`用于测试正则规则在指定的字符串中是否具有符合的匹配结果，如果匹配到则返回true，否则返回false。

```js
    var pattern = /a/;
    console.log(pattern.test('edcba')) // => true
```    

在非全局的匹配模式下，一旦匹配到符合规则的结果，便会停止执行。

在全局模式下，当匹配到符合规则的结果也会停止执行，但是若多次重复执行test方法，则会根据lastIndex属性的值为锚点依次向后匹配，

在匹配到字符串的末尾后，会从头到尾再重新循环匹配。

```js
    var pattern = /a/g;
    console.log(pattern.test('edcba')) // => true 第一次执行。
    console.log(pattern.test('edcba')) // => false 第二次执行。
    console.log(pattern.test('edcba')) // => true 第三次执行。从头到尾重新循环执行。　　
```
#### exec()

exec方法可以返回匹配的结果，以及结果在字符串中的索引和下一次匹配的起始位置。如果正则表达式没有匹配到结果，那么返回的值就是 null。
```js
    var result = /a/.exec('abcdaefga');
    result[0] // -> 当前匹配到的结果。
    result.input // -> 进行匹配操作的字符串。
    result.index // -> 当前匹配结果首字母在字符串中的索引
```
使用exec方法对字符串中的某个结果进行全面匹配，那么正则表达式必须要开启全局模式。在非全局的模式下，exec方法一旦匹配到结果，便会停止执行。
```js
    var pattern = /a/g;
    while(result = pattern.exec('abababab')){
        console.log(result+'index:'+ result.index +' input:'+ result.input);
    }
```
#### compile()

compile可以重新指定正则实例的规则与修饰符。
```js
    var pattern = /res/i;
    pattern.compile('rp','g') -> /rp/g
```
### RegExp 实例属性

RegExp 的每个实例都具有下列属性，通过这些属性可以取得有关模式的各种信息。

* `global` ：布尔值，表示是否设置了 g 标志。

* `ignoreCase` ：布尔值，表示是否设置了 i 标志。

* `lastIndex` ：整数，表示开始搜索下一个匹配项的字符位置，从 0 算起。

* `multiline` ：布尔值，表示是否设置了 m 标志。

* `source` ：正则表达式的字符串表示，按照字面量形式而非传入构造函数中的字符串模式返回。

案例如下：
```js
    var pattern1 = /\[bc\]at/i;
    alert(pattern1.global); //false
    alert(pattern1.ignoreCase); //true
    alert(pattern1.multiline); //false
    alert(pattern1.lastIndex); //0
    alert(pattern1.source); //"\[bc\]at"
    var pattern2 = new RegExp("\\[bc\\]at", "i");
    alert(pattern2.global); //false
    alert(pattern2.ignoreCase); //true
    alert(pattern2.multiline); //false
    alert(pattern2.lastIndex); //0
    alert(pattern2.source); //"\[bc\]at"
```
## (三) JS的正则基础语法

正则表达式是有两种字符模式组成：“普通字符”、"元字符"。通过这两种字符模式的结合使用，可以编写出符合我们要求的正则规则。

### 普通字符

就是由显性的没有特殊含义的打印字符和没有指定为元字符的非打印字符组成。

显性的打印字符，它是实际可见的，例如0-9，a-z，除了可打印的字符，还存在一些非打印的字符，例如ASCII码值在0-31的为控制字符，无法显示和打印，但实际存在。

#### 元字符

元字符更接近计算机语言中的变量含义，它可以代表某种特殊的含义，并且会根据使用场合不同，其具体的含义也不尽相同。

    ( [ { \ ^ $ | ) ? * + .]}

#### 特殊字符一览表

![](http://oe9d5k8dj.bkt.clouddn.com/js%E6%AD%A3%E5%88%99.png)

#### 转义运算符

对元字符进行转义，使其转换为普通字符。
```js
    var pattern = /\[/;
    var str = '[]';
    console.log(pattern.test(str)) // -> true;
```
#### 量词

* `?`：表示匹配0次或1次,相当于 {0,1}，比如：`/a[cd]?/` 可以匹配 "a","ac","ad"

* `+`：表示匹配1次或多次,`/a+b/`可以匹配 "ab","aab","aaab"...

* `{n}`：表示匹配n次,比如：`/\w{2}/` 相当于 `/\w\w/`；`/a{5}/` 相当于 "aaaaa"

* `{n,m}`：表示匹配n到m次,最多重复n次，比如：/ba{1,3}/ 可以匹配 "ba"或"baa"或"baaa"

* `{n,}`：表示至少匹配n次,比如：/ba{2,}/ 可以匹配 "baa"或"baaa"或"baaaa".....

* `*`:表达式不出现或出现任意次，相当于 {0,}，比如：`/\^*b/`可以匹配 "b","^^^b"...

#### 边界

`\b`：匹配单词边界，用于匹配一个整体的单词时使用。

`\B`：匹配非单词边界。

`^`：强制首匹配，以指定规则开始的字符，避免前导的其它字符。

`$`：强制尾匹配，以指定规则结束的字符，避免后导的其它字符。

#### 3.7 类

“类”是具有相同特征的集合，是一个泛指。

* 字符类

`[abc]`：只根据区间内的内容进行匹配。

* 范围类

`[a-zA-Z0-9]`：匹配大小写字符a-z以及数组0-9的范围

* 反向类

`[^a-z]`：取反匹配。匹配不在这个区间范围内的内容
```js
    var str = 'google';
    var pattern = /[^gle]/;
    console.log(pattern.test(str))
```
用 `[^ ]` 包含一系列字符，则能够匹配其中字符之外的任意一个字符。同样的道理，虽然可以匹配其中任意一个，但是只能是一个，

