---
layout: post
title:  "冒泡排序（Bubble Sort）"
date:   2019-05-15 17:35:05
categories:  Javascript 算法
tags: Javascript 算法
author: wisdom
---

* content
{:toc}

最近打算学习一下算法，以下记录我的学习之路。




### (一) 简单的冒泡排序实现

冒泡排序它的思想最简单，重复走过要排序的序列，一次比较两个元素，如果顺序错误就把它们调整过来（升序）。一直重复工作，直到把最大的元素一步步下沉到数组的尾部。

**什么时候最快（Best Cases）：**
当输入的数据已经是正序时（都已经是正序了，我还要你冒泡排序有何用啊。。。。）

**什么时候最慢（Worst Cases）：**
当输入的数据是反序时（写一个for循环反序输出数据不就行了，干嘛要用你冒泡排序呢，我是闲的吗。。。

    let arr = [9, 3, 1, 4, 2, 7, 8, 6, 5]
    
    function exchangeItem(arr, left, right) {
      let arrRight = arr[left]
      arr[left] = arr[right]
      arr[right] = arrRight
    }
    
    function bubbleSort(arr) {
      for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - 1 - i; j++) {
          if (arr[j] > arr[j+1]) exchangeItem(arr, j, j+1)
        }
      }
    }
    
    bubbleSort(arr)
    
    console.log(arr) // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]

可查看[代码](https://github.com/findwisdom/arithmetic-js/blob/master/sort/bubbleSort.js) 

   
