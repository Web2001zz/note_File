# ES6 总结

ES6面试题总结 

## var let const 的区别

- 三者都是声明变量的语句

- var 可以变量提升、可以重复声明、但不会生成块级作用域

- let 不能进行变量提升、可以重复声明、生成块级作用域

- const 声明时必须赋值，不能变量提升，不能重复声明，生成块级作用域

- 值得一提的是const声明的基本数据类型不能修改，但是可以修改复合类型数据中的属性

- ``` js
  const a = 1 
  // a = 2 不能修改基本数据类型
  const a = { b : 1 }
  a.b = 2 // 可以修改复合类型数据中的属性
  ```



## 箭头函数

- 箭头函数为es6新出的函数简写

- 箭头函数没有自己的this指向，箭头函数中的this指向的是箭头函数定义时父级的this指向

- 箭头函数的简写：

  - ``` js
    () => {} //正常写法
    a => a = 1  //当只有一个形参时可以省略括号 当函数的返回语句只有一句是可以省略中括号并写到一排
    ```



## 数组新增常用方法

- map （批量操作），	操作后返回一个新数组

  - ``` js
    let arr = [1,2,3]
    arr.map((item)=>{
        return item + 1
    })
    //arr = [2,3,4]
    ```

- reduce (累加)

- filter(过滤)

- forEarh(遍历) 



## Promise 

- Promise是什么？
  - promise是异步编程的一种解决方案，promise出现的初衷是为了解决回调地狱(回调函数层层嵌套)的问题

- 每个promise自身都会有一个状态
  - pending(进行中) ，fufilled(已成功)， rejected(已失败)
- 在promise内部调用resolve或reject函数 会返回已成功或者已失败的promise状态
- then和catch
  - 调用promise的then方法会根据上一个promise的状态来决定调用传入的两个回调函数
  - then方法本身是同步执行，但传入其中的回调函数是异步执行
  - then方法本身也会根据回调函数中的状态来返回状态 如
    - 如果回调函数也是一个promise  则返回这个promise的状态
    - 如果回调函数没有return则默认返回一个成功的promise
    - 如果回调函数有return  则返回return的值并根据值来决定返回成功还是失败的promise
    - 内部报错会返回失败的promise
  - catch方法的返回状态与promise类似，但一般用于接收上一个promise失败状态来调用第二个回调函数
- async和await
  - async后的函数会变为一个promise对象 也会返回promise的状态
  - await则只会等待一个promise的成功状态，只有接收到成功状态的promise后才会执行await后面的代码
  - 当接收到失败的promise时则会直接返回失败的promise状态并不会继续执行



## 对ES6的理解

​	ECMAscript 6.0 是一种js语言的下一代标准，在2015年6月份正式发布，它的目标是让js语言可以用来编写复杂的大型应用程序，成为企业级的开发语言