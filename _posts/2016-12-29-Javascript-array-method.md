---
layout: post
title:  " Javascript 的 Array类型方法"
date:   2016-12-29 08:35:05
categories:  JavaScript Array
tags: JavaScript Array
author: wisdom
---

* content
{:toc}

学而时习之不不亦乐乎，学习JS也有好长一段时间了，前些时候将精力都放在各样的框架上，想想也该好好花时间将自己的基础夯实一下了。于是今天就好好的复习一下JS的数组吧；






除了 Object 之外， Array 类型恐怕是 ECMAScript 中最常用的类型了。与其他语言不同的是，ECMAScript 数组的每一项可以保存任何类型的数据。


### （一）创建数组：

创建数组的基本方式有两种。第一种是使用 Array 构造函数，一种是数组字面量方法

#### 使用 Array 构造函数创建数组：
```js
    var colors = new Array(3); // 创建一个包含 3 项的数组
    var names = new Array("Greg"); // 创建一个包含 1 项，即字符串"Greg"的数组
```
#### 使用数组字面量方法创建数组
```js
    var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
    var names = []; // 创建一个空数组
    var values = [1,2,]; // 不要这样！这样会创建一个包含 2 或 3 项的数组
    var options = [,,,,,]; // 不要这样！这样会创建一个包含 5 或 6 项的数组
```

### （二）读取和设置数组的值：

读取和设置数组的值时，要使用方括号并提供相应值的基于 0 的数字索引：
```js
    var colors = ["red", "blue", "green"]; // 定义一个字符串数组
    alert(colors[0]); // 显示第一项
    colors[2] = "black"; // 修改第三项
    colors[3] = "brown"; // 新增第四项
```
方括号中的索引表示要访问的值。如果索引小于数组中的项数，则返回对应项的值。

如果设置某个值的索引超过了数组现有项数，如这个例子中的 colors[3] 所示，数组就会自动增加到该索引值加 1 的长度。

访问数组未定义的索引则返回undefined。

### （三）检测数组

ECMAScript 5 新增了 Array.isArray() 方法。这个方法的目的是最终确定某个值到底是不是数组，而不管它是在哪个全局执行环境中创建的。这个方法的用法如下：
```js
    if (Array.isArray(value)){
    //对数组执行某些操作
    }
```
支持 Array.isArray() 方法的浏览器有 IE9+、Firefox 4+、Safari 5+、Opera 10.5+和 Chrome。

### （四）转换方法

所有对象都具有 toLocaleString() 、 toString() 和 valueOf() 方法，数组亦是对象。

#### toString()

方法会返回由数组中每个值的字符串形式拼接而成的一个以逗号分隔的字符串

#### valueOf()

返回数组

实际上，为了创建这个字符串会调用数组每一项的 toString() 方法。来看下面这个例子。
```js
    var colors = ["red", "blue", "green"]; // 创建一个包含 3 个字符串的数组
    alert(colors.toString()); // red,blue,green
    alert(colors.valueOf()); // red,blue,green
    alert(colors); // red,blue,green
```
此处由于 alert() 要接收字符串参数，所以它会在后台调用 toString() 方法，由此会得到与直接调用 toString() 方法相同的结果。

#### toLocaleString()

toLocaleString() 方法经常也会返回与 toString() 和 valueOf() 方法相同的值，但也不总是如此。当调用数组的 toLocaleString() 方法时，它也会创建一个数组值的以逗号分隔的字符串。而与前两个方法唯一的不同之处在于，这一次为了取得每一项的值，调用的是每一项的 toLocale-String() 方法，而不是 toString() 方法。

### （五）栈方法

ECMAScript 数组也提供了一种让数组的行为类似于其他数据结构的方法。

#### push() 方法

可以接收任意数量的参数，把它们逐个添加到数组末尾，并返回修改后数组的长度。

#### pop() 方法

可以从数组末尾移除最后一项，减少数组的 length 值，然后返回移除的项。
```js
    var colors = new Array(); // 创建一个数组
    var count = colors.push("red", "green"); // 推入两项
    alert(count); //2
    count = colors.push("black"); // 推入另一项
    alert(count); //3
    var item = colors.pop(); // 取得最后一项
    alert(item); //"black"
    alert(colors.length); //2
```
### （六）队列方法

#### shift() 方法

能够移除数组中的第一个项并返回该项，同时将数组长度减 1。

#### unshift() 方法

在数组前端添加任意个项并返回新数组的长度。
```js
    var colors = new Array(); //创建一个数组
    var count = colors.push("red", "green"); //推入两项
    alert(count); //2

    var item = colors.shift(); // 取得第一项
    alert(item); //"red"
    alert(colors.length); //1

    var count = colors.unshift("red", "blue"); // 推入两项
    alert(count); //3
```
### （七）重排序方法

#### reverse() 方法

反转数组项的顺序。
```js
    ar values = [1, 2, 3, 4, 5];
    values.reverse();
    alert(values); //5,4,3,2,1
```
#### sort() 方法

按升序排列数组项——即最小的值位于最前面，最大的值排在最后面。
```js
    var values = [0, 1, 5, 10, 15];
    values.sort();
    alert(values); //0,1,10,15,5
```
sort() 方法可以接收一个比较函数作为参数，以便我们指定哪个值位于哪个值的前面。
```js
    function compare(value1, value2) {
        if (value1 < value2) {
            return -1;
        } else if (value1 > value2) {
            return 1;
        } else {
            return 0;
        }
    }

    var values = [0, 1, 5, 10, 15];
    values.sort(compare);
    alert(values); //0,1,5,10,15
```
### （八）操作方法

#### concat() 方法

可以基于当前数组中的所有项创建一个新数组。然后将接收到的参数添加到这个副本的末尾
```js
    var colors = ["red", "green", "blue"];
    var colors2 = colors.concat("yellow", ["black", "brown"]);
    alert(colors); //red,green,blue
    alert(colors2); //red,green,blue,yellow,black,brow
```
#### slice() ，它能够基于当前数组中的一或多个项创建一个新数组。
```js
    var colors = ["red", "green", "blue", "yellow", "purple"];
    var colors2 = colors.slice(1);
    var colors3 = colors.slice(1,4);
    alert(colors2); //green,blue,yellow,purple
    alert(colors3); //green,blue,yellow
```
#### splice() 方法

主要用途是向数组的中部插入项

 ** 删除：

可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， splice(0,2) 会删除数组中的前两项。
```js
    var colors = ["red", "green", "blue"];
    var removed = colors.splice(0,1); // 删除第一项
    alert(colors); // green,blue
    alert(removed); // red，返回的数组中只包含一项
```
 ** 插入：

可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、0（要删除的项数）和要插入的项。如果要插入多个项，可以再传入第四、第五，以至任意多个项。例如，splice(2,0,"red","green") 会从当前数组的位置 2 开始插入字符串 "red" 和 "green" 。
```js
    removed = colors.splice(1, 0, "yellow", "orange"); // 从位置 1 开始插入两项
    alert(colors); // green,yellow,orange,blue
    alert(removed); // 返回的是一个空数组
```
 ** 替换：

以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。
```js
    removed = colors.splice(1, 1, "red", "purple"); // 插入两项，删除一项
    alert(colors); // green,red,purple,orange,blue
    alert(removed); // yellow，返回的数组中只包含一项
```
### （九）位置方法

indexOf() 和 lastIndexOf() 。这两个方法都接收、两个参数：要查找的项和（可选的）表示查找起点位置的索引。

#### indexOf() 方法

indexOf() 方法从数组的开头（位置 0）开始向后查找
```js
    var numbers = [1,2,3,4,5,4,3,2,1];
    alert(numbers.indexOf(4)); //3
```
#### lastIndexOf()  方法
```js
    alert(numbers.lastIndexOf(4)); //5
    alert(numbers.indexOf(4, 4)); //5
    alert(numbers.lastIndexOf(4, 4)); //3
```
在比较第一个参数与数组中的每一项时，会使用全等操作符；也就是说，要求查找的项必须严格相等（就像使用===一样）。
```js
    var person = { name: "Nicholas" };
    var people = [{ name: "Nicholas" }];
    var morePeople = [person];
    alert(people.indexOf(person)); //-1
    alert(morePeople.indexOf(person)); //0
```
### （十）迭代方法

ECMAScript 5 为数组定义了 5 个迭代方法。每个方法都接收两个参数：要在_每一项上运行的函数_和_（可选的）运行该函数的作用域对象——影响 this 的值_。

传入这些方法中的函数会接收三个参数：`数组项的值`、`数组中的位置`和`数组对象`本身。

 ** 以下方法都不会修改数组中的包含的值。

支持下怒啊吧迭代方法的浏览器有IE9+、Firefox 2+、Safari 3+、Opera 9.5+和 Chrome。

#### every() 方法

对数组中的每一项运行给定函数，如果该函数对每一项都返回 true ，则返回 true。

#### some() 方法

对数组中的每一项运行给定函数，如果该函数对任一项返回 true ，则返回 true 。
```js
    //every()
    var numbers = [1,2,3,4,5,4,3,2,1];
    var everyResult = numbers.every(function(item, index, array){
        return (item > 2);
    });
    alert(everyResult); //false

    //some
    var someResult = numbers.some(function(item, index, array){
        return (item > 2);
    });
    alert(someResult); //true
```
#### forEach() 方法

对数组中的每一项运行给定函数。这个方法没有返回值。
```js
    var numbers = [1,2,3,4,5,4,3,2,1];
    numbers.forEach(function(item, index, array){
        //执行某些操作
    });
```
#### filter() 方法

对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
```js
    var numbers = [1,2,3,4,5,4,3,2,1];
    var filterResult = numbers.filter(function(item, index, array){
        return (item > 2);
    });
    alert(filterResult); //[3,4,5,4,3]
```
#### map() 方法

对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
```js
    var numbers = [1,2,3,4,5,4,3,2,1];
    var mapResult = numbers.map(function(item, index, array){
        return item * 2;
    });
    alert(mapResult); //[2,4,6,8,10,8,6,4,2]
```
#### 归并方法

迭代数组的所有项，然后构建一个最终返回的值。

这两个方法都接收两个参数：一个在每一_项上调用的函数_和_（可选的）作为归并基础的初始值_。

给 reduce() 和 reduceRight() 的函数接收 4 个参数：`前一个值`、`当前值`、`项的索引`和`数组对象`。

这个函数返回的任何值都会作为第一个参数自动传给下一项。

第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。

#### reduce() 方法

使用 reduce() 方法可以执行求数组中所有值之和的操作
```js
    var values = [1,2,3,4,5];
    var sum = values.reduce(function(prev, cur, index, array){
        return prev + cur;
    });
    alert(sum); //15
```
#### reduceRight() 方法

reduceRight() 方法与 reduce() 方法类似，只是执行顺序相反
```js
    var values = [1,2,3,4,5];
    var sum = values.reduceRight(function(prev, cur, index, array){
        return prev + cur;
    });
    alert(sum); //15
```
### 总结

以上将高程又复习了一次，总结一下我们常用的数组方法有 `栈方法`,`队列方法`,`重排序方法`,`操作方法`,`位置方法`,`迭代方法`,`归并方法` 。
